const { body, validationResult } = require("express-validator");

function isGmailAddress(value) {
  if (!value || typeof value !== "string") return false;
  const v = value.trim().toLowerCase();
  return v.endsWith("@gmail.com");
}

function ageInYears(birthDate, today = new Date()) {
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

const signupValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 200 })
    .withMessage("Name is too long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail()
    .custom((value) => {
      if (!isGmailAddress(value)) {
        throw new Error("Use a Gmail address ending in @gmail.com");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must include a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must include an uppercase letter")
    .matches(/\d/)
    .withMessage("Password must include a number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must include a symbol (e.g. ! @ # $ %)"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ max: 500 })
    .withMessage("Location is too long"),
  body("birthdate")
    .trim()
    .notEmpty()
    .withMessage("Birth date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Birth date must be YYYY-MM-DD")
    .custom((value) => {
      const [y, mo, d] = value.split("-").map((n) => parseInt(n, 10));
      const birth = new Date(y, mo - 1, d);
      if (
        birth.getFullYear() !== y ||
        birth.getMonth() !== mo - 1 ||
        birth.getDate() !== d
      ) {
        throw new Error("That is not a valid calendar date");
      }
      const age = ageInYears(birth);
      if (age <= 13) {
        throw new Error("You must be older than 13");
      }
      if (age > 150) {
        throw new Error("Invalid birth date");
      }
      return true;
    }),
];

const loginValidators = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail()
    .custom((value) => {
      if (!isGmailAddress(value)) {
        throw new Error("Use a Gmail address ending in @gmail.com");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ max: 128 })
    .withMessage("Password is too long"),
];

const reviewValidators = [
  body("destination")
    .trim()
    .notEmpty()
    .withMessage("Destination is required")
    .isLength({ max: 500 })
    .withMessage("Destination name is too long"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("reviewText")
    .trim()
    .notEmpty()
    .withMessage("Review text is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Review must be between 10 and 2000 characters"),
];

function validationErrors(req) {
  const result = validationResult(req);
  if (result.isEmpty()) return null;
  return result.array().map((e) => {
    const raw = e.path != null ? String(e.path) : "";
    const field = raw.includes(".") ? raw.split(".").pop() : raw;
    return {
      field: field || "form",
      message: e.msg,
    };
  });
}

module.exports = {
  signupValidators,
  loginValidators,
  reviewValidators,
  validationErrors,
};
