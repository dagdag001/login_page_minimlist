const express = require("express");
const path = require("path");

const app = express();
const users = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/signup", (req, res) => {
  const name = String((req.body && req.body.name) || "").trim();
  const email = String((req.body && req.body.email) || "").trim().toLowerCase();
  const password = String((req.body && req.body.password) || "");
  const location = String((req.body && req.body.location) || "").trim();
  const birthdate = String((req.body && req.body.birthdate) || "").trim();
  if (!name || !email || !password || !location || !birthdate) {
    return res.status(400).json({ ok: false });
  }
  if (users.some((u) => u.email === email)) {
    return res.status(409).json({ ok: false });
  }
  users.push({ name, email, password, location, birthdate });
  res.status(201).json({ ok: true });
});

app.post("/api/login", (req, res) => {
  const email = String((req.body && req.body.email) || "").trim().toLowerCase();
  const password = String((req.body && req.body.password) || "");
  const user = users.find((u) => u.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ ok: false });
  }
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000);
