//Mostra spinner e messaggio di errore quando carica i preferiti
//Quando carica spinner animato.
//Se errore  messaggio rosso ben visibile.
//Se nessun risultato  messaggio chiaro (“Nessuna ricetta trovata”)

"use client";

import { useState, useEffect } from "react";
import { readFavorites } from "../../lib/storage";
import { lookupMeal } from "../../lib/meals";
import RecipeCard from "../../components/RecipeCard";
import Spinner from "../../components/Spinner";

function safeText(val) {
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (val === null || val === undefined) return "";
  return JSON.stringify(val);
}

export default function FavoritesPage() {
  const [ids, setIds] = useState([null]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const arr = readFavorites();
    setIds(arr);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const fetched = [];
        for (const id of ids) {
          const m = await lookupMeal(id).catch(() => null);
          if (m) fetched.push(m);
        }
        setMeals(fetched);
      } catch (e) {
        setError("Errore durante il caricamento dei preferiti.");
      } finally {
        setLoading(false);
      }
    }
    if (ids.length) load();
  }, [ids]);

  //if (!ids.length) return <p>Nessun preferito.</p>;
  if (ids && ids.length === 0) return <p>{safeText("Nessun preferito.")}</p>;
  if (loading) return <Spinner />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>{safeText("I tuoi preferiti")}</h2>
      <div className="grid">
        {meals.map((m) => (
          <RecipeCard key={m.id} meal={m} />
        ))}
      </div>
    </div>
  );
}
