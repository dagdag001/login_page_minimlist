import { GoogleSignIn } from "./GoogleSignIn";

export function OAuthSection({ onGoogleSuccess, onError, onClearError }) {
  return (
    <>
      <p className="oauth-divider">
        <span>Or</span>
      </p>
      <GoogleSignIn
        onSuccess={onGoogleSuccess}
        onError={onError}
        onClearError={onClearError}
      />
    </>
  );
}
