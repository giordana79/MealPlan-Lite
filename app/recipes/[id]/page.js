"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { lookupMeal } from "../../../lib/meals";
import Spinner from "../../../components/Spinner";
import RecipeActions from "../../../components/RecipeActions";

function safeText(val) {
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (val === null || val === undefined) return "";
  return JSON.stringify(val);
}

export default function RecipePage({ params }) {
  const id = params?.id;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const m = await lookupMeal(id);
        if (!m) {
          setError("Ricetta non trovata.");
        } else {
          setMeal(m);
        }
      } catch (e) {
        setError("Errore nel caricamento della ricetta.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <Spinner />;
  if (error)
    return (
      <p role="alert" style={{ color: "red" }}>
        {safeText(error)}
      </p>
    );
  if (!meal) return <p>Nessuna ricetta trovata.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{safeText(meal.title)}</h2>

      <div style={{ maxWidth: "480px", marginBottom: "1rem" }}>
        <Image
          src={meal.thumb}
          alt={`Foto del piatto ${safeText(meal.title)}`}
          width={480}
          height={320}
          priority
          style={{ borderRadius: "8px", width: "100%", height: "auto" }}
        />
      </div>

      <p style={{ fontSize: "14px", color: "#555" }}>
        {safeText(meal.category)} • {safeText(meal.area)}
      </p>

      <h3>Ingredienti</h3>
      <ul>
        {meal.ingredients.map((it, idx) => (
          <li key={idx}>
            {safeText(it.measure)} {safeText(it.ingredient)}
          </li>
        ))}
      </ul>

      <h3>Istruzioni</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {safeText(meal.instructions)}
      </pre>

      <RecipeActions mealId={meal.id} />
    </div>
  );
}
