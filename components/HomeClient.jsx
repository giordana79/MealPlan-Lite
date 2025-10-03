"use client";

import { useState } from "react";
import ClientSearch from "./ClientSearch";

//Vedi Nota
function safeText(val) {
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (val === null || val === undefined) return "";
  return JSON.stringify(val);
}

export default function HomeClient({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <div className="controls">
          <input
            type="text"
            placeholder="Cerca ricetta..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
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
      </div>

      <ClientSearch q={query} category={selectedCategory} />
    </div>
  );
}
