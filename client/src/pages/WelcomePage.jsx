import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { clearSession, getToken } from "../auth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { AuthLayout } from "../components/AuthLayout";
import { AuthPanel } from "../components/AuthPanel";
import { WelcomeCard } from "../components/WelcomeCard";

export function WelcomePage() {
  useDocumentTitle("Welcome · Auth");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      setLoadError("");
      try {
        const res = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (cancelled) return;
        if (res.status === 401) {
          clearSession();
          navigate("/", { replace: true });
          return;
        }
        if (!res.ok) {
          const msg =
            res.status === 429
              ? "Too many requests. Wait a moment and try again."
              : "Could not load your account.";
          setLoadError(msg);
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setUser({ email: data.email, name: data.name || "" });
      } catch {
        if (!cancelled) {
          setLoadError("Network error. Check your connection and try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    setLoading(true);
    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [navigate, retryTick]);

  function logout() {
    clearSession();
    navigate("/", { replace: true });
  }

  if (loading) {
    return (
      <AuthLayout>
        <p className="welcome-loading">Loading…</p>
      </AuthLayout>
    );
  }

  if (!user && !loadError) {
    return <Navigate to="/" replace />;
  }

  if (loadError) {
    return (
      <AuthLayout>
        <AuthPanel title="Welcome">
          <p className="banner-err" role="alert">
            {loadError}
          </p>
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => {
              setLoadError("");
              setLoading(true);
              setRetryTick((t) => t + 1);
            }}
          >
            Try again
          </button>
        </AuthPanel>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <WelcomeCard user={user} onSignOut={logout} />
    </AuthLayout>
  );
}
