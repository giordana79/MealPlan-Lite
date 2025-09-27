"use client";

import { useState, useEffect } from "react";
import ClientSearch from "./ClientSearch";

export default function HomeClient({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        {/* Barra di ricerca */}
        <input
          type="text"
          placeholder="Cerca ricetta..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", width: "60%" }}
        />

        {/* Filtro categorie */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ marginLeft: "1rem", padding: "8px" }}
        >
          <option value="">Tutte le categorie</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Risultati ricerca */}
      <ClientSearch q={query} category={selectedCategory} />
    </div>
  );
}
