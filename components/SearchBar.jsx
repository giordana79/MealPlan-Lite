"use client";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ categories = [], onSearch }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const deb = useDebounce(q, 350);

  useEffect(() => {
    onSearch(deb, cat);
  }, [deb, cat]);

  return (
    <div className="controls">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cerca ricetta..."
      />
      <select value={cat} onChange={(e) => setCat(e.target.value)}>
        <option value="">Tutte le categorie</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
