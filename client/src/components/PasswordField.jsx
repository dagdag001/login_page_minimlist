export function PasswordField({
  id,
  name,
  label,
  error,
  errorId,
  showPassword,
  onToggleShow,
  extraDescribedBy,
  value,
  onChange,
  children,
  ...inputProps
}) {
  const errId = errorId || `${id}-err`;
  const invalid = !!error;
  const describedBy = [error ? errId : null, extraDescribedBy || null]
    .filter(Boolean)
    .join(" ");

  const inputExtra =
    value !== undefined
      ? { value, onChange }
      : {};

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="row">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          className={`input${invalid ? " input--bad" : ""}`}
          aria-invalid={invalid}
          aria-describedby={describedBy || undefined}
          {...inputExtra}
          {...inputProps}
        />
        <button
          type="button"
          className="btn btn--ghost"
          onClick={onToggleShow}
          aria-pressed={showPassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {children}
      {error ? (
        <p id={errId} className="err" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
