import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../auth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { parseValidationErrors } from "../utils";
import { AlertBanner } from "../components/AlertBanner";
import { AuthLayout } from "../components/AuthLayout";
import { AuthModeNav } from "../components/AuthModeNav";
import { AuthPanel } from "../components/AuthPanel";
import { FormField } from "../components/FormField";
import { OAuthSection } from "../components/OAuthSection";
import { PasswordField } from "../components/PasswordField";
import { SubmitButton } from "../components/SubmitButton";

export function LoginPage() {
  useDocumentTitle("Sign in · Auth");
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  function finishWithToken(token) {
    setAuthToken(token);
    navigate("/welcome");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGeneralError("");
    setFieldErrors({});
    setPending(true);
    const fd = new FormData(e.target);
    const email = String(fd.get("email") || "")
      .trim()
      .toLowerCase();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: String(fd.get("password") || ""),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 400) {
        const { fieldErrors: fe, general } = parseValidationErrors(data);
        setFieldErrors(fe);
        setGeneralError(general);
        return;
      }
      if (!res.ok) {
        setGeneralError(
          data.googleOnly ? "Use Google sign-in." : "Wrong email or password.",
        );
        return;
      }
      if (!data.token) {
        setGeneralError("Sign-in failed.");
        return;
      }
      finishWithToken(data.token);
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthLayout>
      <AuthModeNav active="login" />
      <AuthPanel title="Sign in">
        <AlertBanner message={generalError} />
        <form className="form" onSubmit={handleSubmit} noValidate>
          <FormField
            id="login-email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@gmail.com"
            error={fieldErrors.email}
          />
          <PasswordField
            id="login-password"
            name="password"
            label="Password"
            error={fieldErrors.password}
            showPassword={showPassword}
            onToggleShow={() => setShowPassword((s) => !s)}
            autoComplete="current-password"
            placeholder="••••••••"
          />
          <SubmitButton pending={pending} pendingLabel="Signing in…">
            Sign in
          </SubmitButton>
        </form>
        <OAuthSection
          onGoogleSuccess={(payload) => {
            if (payload?.token) {
              finishWithToken(payload.token);
            } else {
              setGeneralError("Sign-in incomplete. Please try again.");
            }
          }}
          onError={setGeneralError}
          onClearError={setGeneralError}
        />
      </AuthPanel>
    </AuthLayout>
  );
}
