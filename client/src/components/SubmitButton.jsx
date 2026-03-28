export function SubmitButton({ pending, pendingLabel, children }) {
  return (
    <button type="submit" className="btn btn--block" disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}
