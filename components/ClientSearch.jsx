"use client";

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import RecipeCard from "./RecipeCard";
import Spinner from "./Spinner";

export default function ClientSearch({ q, category }) {
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounced = useDebounce(q, 350);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const url = `/api/search?q=${encodeURIComponent(
          debounced
        )}&c=${encodeURIComponent(category)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Errore server, riprova più tardi.");
        const data = await res.json();
        setMeals(data || []);
      } catch (e) {
        console.error("Errore fetch:", e);
        setError("Impossibile caricare le ricette. Riprova più tardi.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [debounced, category]);

  if (loading) return <Spinner />;

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  //Mostra "nessuna ricetta" solo se meals è già stato caricato
  if (!loading && meals && meals.length === 0) {
    return <p>Nessuna ricetta trovata.</p>;
  }

  if (!meals) {
    return null; //Stato iniziale, non mostra niente
  }

  return (
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
  );
}
