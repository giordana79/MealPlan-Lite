"use client";

import { useState } from "react";
import {
  isFav,
  toggleFav,
  readPlan,
  savePlan,
  defaultPlanTemplate,
} from "../lib/storage";
import DayMealPicker from "./DayMealPicker";

export default function RecipeActions({ mealId }) {
  const [fav, setFav] = useState(isFav(mealId));
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState(null);

  function showTempMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(null), 2500); //Scompare dopo 2,5s
  }

  function onToggle() {
    toggleFav(mealId);
    const updated = isFav(mealId);
    setFav(updated);
    showTempMessage(
      updated
        ? "✅ Ricetta aggiunta ai preferiti"
        : "❌ Ricetta rimossa dai preferiti"
    );
  }

  function onAddToPlan(day, mealTime) {
    const plan = Object.keys(readPlan()).length
      ? readPlan()
      : defaultPlanTemplate();
    plan[day][mealTime] = mealId;
    savePlan(plan);
    setShowPicker(false);
    showTempMessage(`📅 Aggiunta al piano di ${day} (${mealTime})`);
  }

  return (
    <div style={{ marginTop: 12 }}>
      <button className="btn" onClick={onToggle} aria-label="Toggle preferiti">
        {fav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      </button>

      <button
        className="btn ghost"
        onClick={() => setShowPicker((s) => !s)}
        style={{ marginLeft: 8 }}
        aria-label="Aggiungi al piano settimanale"
      >
        Aggiungi al piano settimanale
      </button>

      {showPicker && <DayMealPicker onAdd={onAddToPlan} />}

      {/* Messaggio di conferma */}
      {message && (
        <div
          role="status"
          style={{
            marginTop: "10px",
            padding: "8px 12px",
            borderRadius: "8px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            fontSize: "14px",
            maxWidth: "300px",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
