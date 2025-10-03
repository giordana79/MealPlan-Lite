//Feedback di stato: uno spinner durante il caricamento e
//un messaggio chiaro in caso di errore.

"use client";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          border: "4px solid #ddd",
          borderTop: "4px solid var(--accent)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
