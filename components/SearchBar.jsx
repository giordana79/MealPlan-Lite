"use client";

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

function safeText(val) {
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (val === null || val === undefined) return "";
  return JSON.stringify(val);
}

export default function SearchBar({ categories = [], onSearch }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const deb = useDebounce(q, 350);

  useEffect(() => {
    onSearch(deb, cat);
  }, [deb, cat, onSearch]);

  return (
    <div className="controls">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cerca ricetta..."
      />
      <select value={cat} onChange={(e) => setCat(e.target.value)}>
        <option value="">Tutte le categorie</option>
        {categories.map((c, idx) => {
          const label = safeText(c);
          return (
            <option key={idx} value={label}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
