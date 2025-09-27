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

  function onToggle() {
    toggleFav(mealId);
    setFav(isFav(mealId));
  }

  function onAddToPlan(day, mealTime) {
    const plan = Object.keys(readPlan()).length
      ? readPlan()
      : defaultPlanTemplate();
    plan[day][mealTime] = mealId;
    savePlan(plan);
    setShowPicker(false);
    alert("Ricetta aggiunta al piano.");
  }

  return (
    <div style={{ marginTop: 12 }}>
      <button className="btn" onClick={onToggle}>
        {fav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      </button>
      <button
        className="btn ghost"
        onClick={() => setShowPicker((s) => !s)}
        style={{ marginLeft: 8 }}
      >
        Aggiungi al piano settimanale
      </button>
      {showPicker && <DayMealPicker onAdd={onAddToPlan} />}
    </div>
  );
}
