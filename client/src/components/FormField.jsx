export function FormField({
  id,
  name,
  label,
  type = "text",
  error,
  errorId,
  ...inputProps
}) {
  const errId = errorId || `${id}-err`;
  const invalid = !!error;
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={`input${invalid ? " input--bad" : ""}`}
        aria-invalid={invalid}
        aria-describedby={error ? errId : undefined}
        {...inputProps}
      />
      {error ? (
        <p id={errId} className="err" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
