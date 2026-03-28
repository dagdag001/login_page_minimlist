import { Link } from "react-router-dom";

export function AuthModeNav({ active }) {
  return (
    <nav className="auth-nav" aria-label="Account">
      {active === "login" ? (
        <span>Sign in</span>
      ) : (
        <Link to="/">Sign in</Link>
      )}
      {active === "signup" ? (
        <span>Sign up</span>
      ) : (
        <Link to="/signup">Sign up</Link>
      )}
    </nav>
  );
}
