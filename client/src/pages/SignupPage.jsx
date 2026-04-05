import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { setAuthToken } from "../auth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  parseValidationErrors,
  parseMMDDYYYY,
  toISODateString,
  passwordChecks,
  passwordStrengthMet,
} from "../utils";

import { AlertBanner } from "../components/AlertBanner";
import { FormField } from "../components/FormField";
import { PasswordField } from "../components/PasswordField";
import { SubmitButton } from "../components/SubmitButton";
import { OAuthSection } from "../components/OAuthSection";
import Logo from "../components/Logo";
import { SmallHeader } from "../components/landing/SmallHeader";

export function SignupPage() {
  useDocumentTitle("Create account · Auth");

  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [showPasswordGuidance, setShowPasswordGuidance] = useState(false);

  const checks = passwordChecks(passwordValue);
  const metCount = passwordStrengthMet(passwordValue);

  function finishGoogleSignup(payload) {
    if (payload?.token) {
      setAuthToken(payload.token);
      navigate("/welcome");
    } else {
      setGeneralError("Sign-in incomplete. Please try again.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGeneralError("");
    setFieldErrors({});
    setPending(true);

    const fd = new FormData(e.currentTarget);
    const birthRaw = String(fd.get("birthdateDisplay") || "").trim();
    const parsedBirth = parseMMDDYYYY(birthRaw);

    if (!parsedBirth) {
      setFieldErrors({
        birthdate: "Enter a valid date as MM/DD/YYYY",
      });
      setPending(false);
      return;
    }

    const birthdate = toISODateString(parsedBirth);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") || "").trim(),
          email: String(fd.get("email") || "").trim().toLowerCase(),
          password: String(fd.get("password") || ""),
          location: String(fd.get("location") || "").trim(),
          birthdate,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 400) {
        const { fieldErrors: fe, general } = parseValidationErrors(data);
        setFieldErrors(fe);
        setGeneralError(general);
        if (fe.password) setShowPasswordGuidance(true);
        return;
      }

      if (res.status === 409) {
        setGeneralError("Email already registered.");
        return;
      }

      if (!res.ok) {
        setGeneralError("Could not create account.");
        return;
      }

      if (data.token) {
        setAuthToken(data.token);
        navigate("/welcome", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-orange-50 via-cream-50 to-orange-100 p-6 md:p-10">
      {/* Decorative SVG - Right side */}
      <img 
        src="/src/balloon.svg" 
        alt="" 
        aria-hidden="true"
        className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 opacity-30 -rotate-12 pointer-events-none hidden lg:block"
      />

      <div className="w-full max-w-md space-y-6 relative z-10">
        
          <SmallHeader/>

          {/* Card */}
          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-center">
              Create account
            </h2>

            <AlertBanner message={generalError} />

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <FormField
                id="signup-name"
                name="name"
                label="Full name"
                autoComplete="name"
                placeholder="Jane Doe"
                error={fieldErrors.name}
              />

              <FormField
                id="signup-email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@gmail.com"
                error={fieldErrors.email}
              />

              <PasswordField
                id="signup-password"
                name="password"
                label="Password"
                error={fieldErrors.password}
                showPassword={showPassword}
                onToggleShow={() => setShowPassword((s) => !s)}
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                placeholder="Choose a password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                extraDescribedBy={
                  showPasswordGuidance
                    ? "password-strength-checklist"
                    : undefined
                }
              >
                {showPasswordGuidance && (
                  <>
                    {/* Strength bars */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className={`h-1 flex-1 rounded ${
                            i <= metCount ? "bg-green-500" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Checklist */}
                    <ul
                      id="password-strength-checklist"
                      className="text-xs space-y-1 mt-2"
                    >
                      <li className={checks.length ? "text-green-600" : ""}>
                        8+ characters
                      </li>
                      <li className={checks.lower ? "text-green-600" : ""}>
                        Lowercase letter
                      </li>
                      <li className={checks.upper ? "text-green-600" : ""}>
                        Uppercase letter
                      </li>
                      <li className={checks.number ? "text-green-600" : ""}>
                        A number
                      </li>
                      <li className={checks.symbol ? "text-green-600" : ""}>
                        A symbol
                      </li>
                    </ul>
                  </>
                )}
              </PasswordField>

              <FormField
                id="signup-location"
                name="location"
                label="Location"
                autoComplete="address-level1"
                placeholder="City or region"
                error={fieldErrors.location}
              />

              <FormField
                id="signup-birthdate"
                name="birthdateDisplay"
                label="Birth date"
                inputMode="numeric"
                autoComplete="bday"
                placeholder="MM/DD/YYYY"
                error={fieldErrors.birthdate}
              />

              <SubmitButton pending={pending} pendingLabel="Creating account…">
                Create account
              </SubmitButton>
            </form>

            <div className="mt-6">
              <OAuthSection
                onGoogleSuccess={finishGoogleSignup}
                onError={setGeneralError}
                onClearError={setGeneralError}
              />
            </div>
          </div>
        </div>
    </div>
  );
}