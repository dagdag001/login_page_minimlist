export function AuthLayout({ wide, children }) {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className={wide ? "auth-stack auth-stack--wide" : "auth-stack"}>
        {children}
      </div>
    </main>
  );
}
