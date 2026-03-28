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
import { AuthLayout } from "../components/AuthLayout";
import { AuthModeNav } from "../components/AuthModeNav";
import { AuthPanel } from "../components/AuthPanel";
import { FormField } from "../components/FormField";
import { OAuthSection } from "../components/OAuthSection";
import { PasswordField } from "../components/PasswordField";
import { SubmitButton } from "../components/SubmitButton";

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
    const fd = new FormData(e.target);
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
          email: String(fd.get("email") || "")
            .trim()
            .toLowerCase(),
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
        if (fe.password) {
          setShowPasswordGuidance(true);
        }
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
    <AuthLayout wide>
      <AuthModeNav active="signup" />
      <AuthPanel title="Create account">
        <AlertBanner message={generalError} />
        <form className="form" onSubmit={handleSubmit} noValidate>
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
              showPasswordGuidance ? "password-strength-checklist" : undefined
            }
          >
            {showPasswordGuidance ? (
              <>
                <div className="strength-meter" aria-hidden>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={i <= metCount ? "is-on" : ""} />
                  ))}
                </div>
                <ul
                  id="password-strength-checklist"
                  className="strength-checklist"
                  aria-label="Password rules"
                >
                  <li className={checks.length ? "is-met" : ""}>
                    8+ characters
                  </li>
                  <li className={checks.lower ? "is-met" : ""}>
                    Lowercase letter
                  </li>
                  <li className={checks.upper ? "is-met" : ""}>
                    Uppercase letter
                  </li>
                  <li className={checks.number ? "is-met" : ""}>A number</li>
                  <li className={checks.symbol ? "is-met" : ""}>A symbol</li>
                </ul>
              </>
            ) : null}
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
        <OAuthSection
          onGoogleSuccess={finishGoogleSignup}
          onError={setGeneralError}
          onClearError={setGeneralError}
        />
      </AuthPanel>
    </AuthLayout>
  );
}
