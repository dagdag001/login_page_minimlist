export function parseValidationErrors(data) {
  const fieldErrors = {};
  const generalParts = [];
  if (!data || !Array.isArray(data.errors)) {
    return { fieldErrors, general: "" };
  }
  for (const err of data.errors) {
    if (err && typeof err === "object" && err.field && err.message) {
      const f = err.field;
      if (
        ["name", "email", "password", "location", "birthdate"].includes(f)
      ) {
        fieldErrors[f] = fieldErrors[f]
          ? `${fieldErrors[f]} ${err.message}`
          : err.message;
      } else {
        generalParts.push(err.message);
      }
    } else if (typeof err === "string") {
      generalParts.push(err);
    }
  }
  return { fieldErrors, general: generalParts.join(" ") };
}

export function parseMMDDYYYY(s) {
  const m = String(s || "")
    .trim()
    .match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const mo = parseInt(m[1], 10);
  const d = parseInt(m[2], 10);
  const y = parseInt(m[3], 10);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const date = new Date(y, mo - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== mo - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }
  return date;
}

export function toISODateString(d) {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${mo}-${day}`;
}

export function passwordChecks(password) {
  const p = String(password || "");
  return {
    length: p.length >= 8,
    lower: /[a-z]/.test(p),
    upper: /[A-Z]/.test(p),
    number: /\d/.test(p),
    symbol: /[^A-Za-z0-9]/.test(p),
  };
}

export function passwordStrengthMet(password) {
  const c = passwordChecks(password);
  return Object.values(c).filter(Boolean).length;
}
