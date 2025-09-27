"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <div
      onClick={toggleTheme}
      style={{
        width: "60px",
        height: "30px",
        borderRadius: "30px",
        background: theme === "light" ? "#ddd" : "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: theme === "light" ? "flex-start" : "flex-end",
        padding: "4px",
        cursor: "pointer",
        transition: "background 0.3s, justify-content 0.3s",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: theme === "light" ? "#fff" : "#000",
          color: theme === "light" ? "#000" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          transition: "background 0.3s, transform 0.3s",
        }}
      >
        {theme === "light" ? "☀️" : "🌙"}
      </div>
    </div>
  );
}
