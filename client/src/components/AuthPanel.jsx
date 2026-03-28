export function AuthPanel({ title, children }) {
  return (
    <div className="panel">
      <div className="panel-h">
        <h1 className="panel-title">{title}</h1>
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
}
