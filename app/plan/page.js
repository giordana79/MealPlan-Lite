"use client";

import { useEffect, useState } from "react";
import {
  readPlan,
  savePlan,
  defaultPlanTemplate,
  readFavorites,
} from "../../lib/storage";
import { lookupMeal } from "../../lib/meals";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function DayMealPicker({ onAdd }) {
  const [day, setDay] = useState("monday");
  const [time, setTime] = useState("lunch");
  return (
    <div style={{ marginTop: 8 }}>
      <select value={day} onChange={(e) => setDay(e.target.value)}>
        {days.map((d) => (
          <option key={d} value={d}>
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </option>
        ))}
      </select>
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{ marginLeft: 8 }}
      >
        <option value="lunch">Pranzo</option>
        <option value="dinner">Cena</option>
      </select>
      <button
        className="btn"
        onClick={() => onAdd(day, time)}
        style={{ marginLeft: 8 }}
      >
        Conferma
      </button>
    </div>
  );
}
