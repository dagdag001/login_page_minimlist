import { useEffect, useLayoutEffect, useRef, useState } from "react";

let gsiScriptPromise = null;

function loadGsiScript() {
  if (typeof window !== "undefined" && window.google?.accounts?.id) {
    return Promise.resolve();
  }
  if (gsiScriptPromise) return gsiScriptPromise;
  gsiScriptPromise = new Promise((resolve, reject) => {
    const fail = (err) => {
      gsiScriptPromise = null;
      reject(err);
    };
    const existing = document.querySelector("script[data-auth-gsi]");
    if (existing) {
      const done = () => {
        if (window.google?.accounts?.id) resolve();
        else fail(new Error("Google Sign-In unavailable"));
      };
      if (window.google?.accounts?.id) {
        done();
        return;
      }
      existing.addEventListener("load", done, { once: true });
      existing.addEventListener(
        "error",
        () => fail(new Error("Could not load Google")),
        { once: true },
      );
      return;
    }
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.dataset.authGsi = "1";
    s.onload = () => resolve();
    s.onerror = () => fail(new Error("Could not load Google"));
    document.head.appendChild(s);
  });
  return gsiScriptPromise;
}

export function GoogleSignIn({ onSuccess, onError, onClearError }) {
  const wrapRef = useRef(null);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onClearErrorRef = useRef(onClearError);
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;
  onClearErrorRef.current = onClearError;

  const [showHint, setShowHint] = useState(false);
  const [gsiReady, setGsiReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const cfgRes = await fetch("/api/oauth-config");
      const cfg = await cfgRes.json().catch(() => ({}));
      if (cancelled) return;
      if (!cfg.googleClientId) {
        setShowHint(true);
        return;
      }

      try {
        await loadGsiScript();
      } catch {
        if (!cancelled) onErrorRef.current("Could not load Google.");
        return;
      }

      if (cancelled || typeof google === "undefined" || !google.accounts?.id) {
        if (!cancelled) onErrorRef.current("Could not load Google.");
        return;
      }

      google.accounts.id.initialize({
        client_id: cfg.googleClientId,
        callback: async (resp) => {
          if (!resp?.credential) return;
          onClearErrorRef.current?.("");
          try {
            const res = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: resp.credential }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.ok) {
              if (res.status === 403 && data.reason === "gmail_only") {
                onErrorRef.current("Only @gmail.com accounts.");
                return;
              }
              if (res.status === 429) {
                onErrorRef.current(
                  "Too many sign-in attempts. Try again later.",
                );
                return;
              }
              onErrorRef.current("Google sign-in failed.");
              return;
            }
            if (!data.token) {
              onErrorRef.current("Sign-in incomplete. Please try again.");
              return;
            }
            onSuccessRef.current({
              token: data.token,
              email: data.email,
              name: data.name || "",
            });
          } catch {
            onErrorRef.current("Google sign-in failed.");
          }
        },
      });

      if (!cancelled) setGsiReady(true);
    }

    init();
    return () => {
      cancelled = true;
      if (typeof google !== "undefined" && google.accounts?.id?.cancel) {
        try {
          google.accounts.id.cancel();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (!gsiReady || !wrapRef.current) return;
    const el = wrapRef.current;
    const rawW = el.getBoundingClientRect().width;
    const w = Math.min(400, Math.max(280, Math.round(rawW) || 320));
    el.replaceChildren();
    google.accounts.id.renderButton(el, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "continue_with",
      width: w,
    });
  }, [gsiReady]);

  return (
    <>
      <div ref={wrapRef} className="google-signin-wrap" />
      {showHint ? (
        <p className="oauth-hint">Set GOOGLE_CLIENT_ID in .env.</p>
      ) : !gsiReady ? (
        <p className="oauth-hint">Loading Google sign-in…</p>
      ) : null}
    </>
  );
}
