//Handles search, fetch, pagination)

"use client";

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import RecipeCard from "./RecipeCard";

export default function ClientSearch({ q, category }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(q, 350);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const url = `/api/search?q=${encodeURIComponent(debounced)}&c=${encodeURIComponent(category)}`;
        const res = await fetch(url);
        const data = await res.json();
        setMeals(data || []);
      } catch (e) {
        console.error("Errore fetch:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [debounced, category]);

  return (
    <div>
      {loading && <p>Caricamento...</p>}
      {!loading && meals.length === 0 && <p>Nessuna ricetta trovata.</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {meals.map((m) => (
          <RecipeCard key={m.id} meal={m} />
        ))}
      </div>
    </div>
  );
}
