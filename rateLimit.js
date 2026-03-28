function rateLimit(options = {}) {
  const windowMs = Number(options.windowMs) || 60_000;
  const max = Number(options.max) || 60;
  const keyPrefix = options.keyPrefix || "";
  const buckets = new Map();

  return function rateLimitMiddleware(req, res, next) {
    const rawIp =
      (typeof req.ip === "string" && req.ip) ||
      req.socket?.remoteAddress ||
      "unknown";
    const key = keyPrefix + rawIp;
    const now = Date.now();
    let b = buckets.get(key);
    if (!b || now - b.start >= windowMs) {
      b = { start: now, count: 0 };
      buckets.set(key, b);
    }
    b.count += 1;
    if (b.count > max) {
      const retrySec = Math.max(
        1,
        Math.ceil((windowMs - (now - b.start)) / 1000),
      );
      res.set("Retry-After", String(retrySec));
      return res.status(429).json({ ok: false, error: "Too many requests" });
    }
    next();
  };
}

module.exports = { rateLimit };
