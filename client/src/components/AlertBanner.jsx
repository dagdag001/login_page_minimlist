export function AlertBanner({ message }) {
  if (!message) return null;
  return (
    <p className="banner-err" role="alert">
      {message}
    </p>
  );
}
