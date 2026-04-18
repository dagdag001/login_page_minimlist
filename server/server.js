require("dotenv").config();

const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const {
  initDb,
  signupUser,
  findUserByEmail,
  upsertGoogleUser,
  createReview,
  getReviews,
  incrementHelpfulCount,
  getReviewStats,
} = require("./db");
const {
  signupValidators,
  loginValidators,
  reviewValidators,
  validationErrors,
} = require("./validators");
const { rateLimit } = require("./rateLimit");

const app = express();

if (process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const oauthClient = googleClientId ? new OAuth2Client(googleClientId) : null;

function resolveJwtSecret() {
  const fromEnv = process.env.JWT_SECRET;
  if (fromEnv && String(fromEnv).length >= 16) {
    return String(fromEnv);
  }
  if (process.env.NODE_ENV === "production") {
    console.error(
      "JWT_SECRET must be set in .env (at least 16 characters for security).",
    );
    process.exit(1);
  }
  console.warn(
    "[auth] JWT_SECRET missing or shorter than 16 characters — using a fixed dev-only secret. Add JWT_SECRET to .env for production or to match other environments.",
  );
  return "local-dev-only-jwt-secret-do-not-use-in-production";
}

const JWT_SECRET = resolveJwtSecret();
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const BCRYPT_ROUNDS = 12;

function signUserToken(email, name) {
  return jwt.sign(
    { email, name: name || "" },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN, subject: email }
  );
}

function getBearerUser(req) {
  const h = req.headers.authorization || "";
  const m = h.match(/^Bearer\s+(\S+)/i);
  if (!m) return null;
  try {
    const p = jwt.verify(m[1], JWT_SECRET);
    return {
      email: String(p.email || p.sub || "").toLowerCase(),
      name: p.name != null ? String(p.name) : "",
    };
  } catch {
    return null;
  }
}

app.use(express.json());

const apiRateLimit = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_API_WINDOW_MS) || 60_000,
  max: Number(process.env.RATE_LIMIT_API_MAX) || 120,
  keyPrefix: "api:",
});

const authRateLimit = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_AUTH_WINDOW_MS) || 15 * 60_000,
  max: Number(process.env.RATE_LIMIT_AUTH_MAX) || 30,
  keyPrefix: "auth:",
});

app.use("/api", apiRateLimit);

app.get("/api/oauth-config", (req, res) => {
  res.json({ googleClientId });
});

app.get("/api/me", (req, res) => {
  const u = getBearerUser(req);
  if (!u || !u.email) {
    return res.status(401).json({ ok: false });
  }
  res.json({ ok: true, email: u.email, name: u.name });
});

app.post("/api/signup", authRateLimit, ...signupValidators, async (req, res) => {
  try {
    const msgs = validationErrors(req);
    if (msgs) {
      return res.status(400).json({ ok: false, errors: msgs });
    }
    const { name, email, password, location, birthdate } = req.body;
    const trimmedName = name.trim();
    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const out = await signupUser(
      trimmedName,
      email,
      hash,
      location.trim(),
      birthdate.trim()
    );
    if (out.conflict) {
      return res.status(409).json({ ok: false });
    }
    const token = signUserToken(email, trimmedName);
    res.status(201).json({
      ok: true,
      token,
      email,
      name: trimmedName,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false });
  }
});

app.post("/api/login", authRateLimit, ...loginValidators, async (req, res) => {
  try {
    const msgs = validationErrors(req);
    if (msgs) {
      return res.status(400).json({ ok: false, errors: msgs });
    }
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ ok: false });
    }
    if (user.password === null) {
      return res.status(401).json({ ok: false, googleOnly: true });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ ok: false });
    }
    const token = signUserToken(user.email, user.name);
    res.json({
      ok: true,
      token,
      email: user.email,
      name: user.name,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false });
  }
});

app.post("/api/auth/google", authRateLimit, async (req, res) => {
  const credential = req.body && req.body.credential;
  if (!credential || !oauthClient) {
    return res.status(400).json({ ok: false });
  }
  try {
    const ticket = await oauthClient.verifyIdToken({
      idToken: credential,
      audience: googleClientId,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(401).json({ ok: false });
    }
    const email = String(payload.email).toLowerCase();
    if (!email.endsWith("@gmail.com")) {
      return res.status(403).json({ ok: false, reason: "gmail_only" });
    }
    const name = String(payload.name || payload.email.split("@")[0] || "User").trim();
    const user = await upsertGoogleUser(email, name);
    const token = signUserToken(user.email, user.name);
    res.json({
      ok: true,
      token,
      name: user.name,
      email: user.email,
    });
  } catch (e) {
    console.error(e);
    res.status(401).json({ ok: false });
  }
});

// Review endpoints
app.post("/api/reviews", apiRateLimit, ...reviewValidators, async (req, res) => {
  try {
    const user = getBearerUser(req);
    if (!user || !user.email) {
      return res.status(401).json({ ok: false, error: "Authentication required" });
    }

    const msgs = validationErrors(req);
    if (msgs) {
      return res.status(400).json({ ok: false, errors: msgs });
    }

    const { destination, rating, reviewText } = req.body;
    const review = await createReview(
      user.email,
      user.name || "Anonymous",
      destination.trim(),
      parseInt(rating, 10),
      reviewText.trim()
    );

    res.status(201).json({
      ok: true,
      review: {
        id: review.id,
        name: review.user_name,
        destination: review.destination,
        rating: review.rating,
        text: review.review_text,
        helpful: review.helpful_count,
        date: review.created_at,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to create review" });
  }
});

app.get("/api/reviews", apiRateLimit, async (req, res) => {
  try {
    const destination = req.query.destination || null;
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = parseInt(req.query.offset, 10) || 0;

    const reviews = await getReviews(destination, limit, offset);

    res.json({
      ok: true,
      reviews: reviews.map((r) => ({
        id: r.id,
        name: r.user_name,
        destination: r.destination,
        rating: r.rating,
        text: r.review_text,
        helpful: r.helpful_count,
        date: r.created_at,
      })),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to fetch reviews" });
  }
});

app.post("/api/reviews/:id/helpful", apiRateLimit, async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id, 10);
    if (isNaN(reviewId)) {
      return res.status(400).json({ ok: false, error: "Invalid review ID" });
    }

    const result = await incrementHelpfulCount(reviewId);
    if (!result) {
      return res.status(404).json({ ok: false, error: "Review not found" });
    }

    res.json({
      ok: true,
      helpfulCount: result.helpful_count,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to update helpful count" });
  }
});

app.get("/api/reviews/stats", apiRateLimit, async (req, res) => {
  try {
    const stats = await getReviewStats();
    res.json({
      ok: true,
      stats: {
        totalReviews: parseInt(stats.total_reviews, 10),
        averageRating: parseFloat(stats.average_rating) || 0,
        destinationsReviewed: parseInt(stats.destinations_reviewed, 10),
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to fetch stats" });
  }
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
