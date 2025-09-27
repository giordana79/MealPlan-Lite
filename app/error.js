"use client";
export default function Error({ error }) {
  return (
    <div>
      <h2>Si è verificato un errore</h2>
      <pre>{String(error)}</pre>
    </div>
  );
}
