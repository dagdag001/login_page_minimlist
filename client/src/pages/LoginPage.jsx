import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { setAuthToken } from "../auth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { parseValidationErrors } from "../utils";

import { AlertBanner } from "../components/AlertBanner";
import { FormField } from "../components/FormField";
import { PasswordField } from "../components/PasswordField";
import { SubmitButton } from "../components/SubmitButton";
import { OAuthSection } from "../components/OAuthSection";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import Logo from "../components/Logo";
import { SmallHeader } from "../components/landing/SmallHeader";



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

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim().toLowerCase();

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
          data.googleOnly
            ? "Use Google sign-in."
            : "Wrong email or password."
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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-6 md:p-10">
  
  {/* Decorative SVG - Right */}
  <img
    src="/src/balloon.svg"
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute right-[-40px] top-1/2 hidden h-[320px] w-[320px] -translate-y-1/2 rotate-[-10deg] opacity-20 blur-[1px] lg:block"
  />

  {/* Decorative SVG - Left (subtle balance) */}
  <img
    src="/src/balloon.svg"
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute left-[-60px] top-20 hidden h-[220px] w-[220px] rotate-[15deg] opacity-10 blur-sm lg:block"
  />

  {/* Glow effect */}
  <div className="pointer-events-none absolute right-1/3 top-1/3 h-72 w-72 rounded-full bg-orange-200 opacity-20 blur-3xl" />

  {/* Content */}
  <div className="relative z-10 w-full max-w-sm space-y-6">
    
  </div>

          
      <div className="w-full max-w-sm space-y-6 relative z-10">
           <SmallHeader/>

          {/* Card */}
          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-center">
              Sign in
            </h2>

            <AlertBanner message={generalError} />

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

            <div className="mt-6">
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
            </div>
          </div>
        </div>
    </div>
  );
}