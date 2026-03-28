export function WelcomeCard({ user, onSignOut }) {
  const title = user.name ? `Welcome, ${user.name}` : "Welcome";
  const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="panel welcome-card">
      <div className="welcome-inner">
        <div className="welcome-avatar" aria-hidden>
          {initial}
        </div>
        <h1 className="welcome-title">{title}</h1>
        <p className="welcome-kicker">Signed in as</p>
        <p className="welcome-email">{user.email}</p>
        <div className="welcome-actions">
          <button
            type="button"
            className="btn btn--signout btn--block"
            onClick={onSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
