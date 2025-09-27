"use client";

import { useState, useEffect } from "react";
import { readFavorites } from "../../lib/storage";
import { lookupMeal } from "../../lib/meals";
import RecipeCard from "../../components/RecipeCard";

export default function FavoritesPage() {
  const [ids, setIds] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const arr = readFavorites();
    setIds(arr);
  }, []);

  useEffect(() => {
    async function load() {
      const fetched = [];
      for (const id of ids) {
        const m = await lookupMeal(id).catch(() => null);
        if (m) fetched.push(m);
      }
      setMeals(fetched);
    }
    if (ids.length) load();
  }, [ids]);

  if (!ids.length) return <p>Nessun preferito.</p>;

  return (
    <div>
      <h2>I tuoi preferiti</h2>
      <div className="grid">
        {meals.map((m) => (
          <RecipeCard key={m.id} meal={m} />
        ))}
      </div>
    </div>
  );
}
