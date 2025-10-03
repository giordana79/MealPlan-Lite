"use client";

import { useEffect, useState } from "react";
import { readPlan, savePlan, defaultPlanTemplate } from "../../lib/storage";
import { lookupMeal } from "../../lib/meals";
import RecipeCard from "../../components/RecipeCard";
import Spinner from "../../components/Spinner";

function safeText(val) {
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (val === null || val === undefined) return "";
  return JSON.stringify(val);
}

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function PlanPage() {
  const [plan, setPlan] = useState(() => defaultPlanTemplate());
  const [meals, setMeals] = useState({});
  const [message, setMessage] = useState(null);

  //Carica piano da localStorage
  useEffect(() => {
    const stored = readPlan();
    if (stored && Object.keys(stored).length) {
      setPlan(stored);
    } else {
      setPlan(defaultPlanTemplate());
    }
  }, []);

  //Carica ricette associate agli ID presenti nel piano
  useEffect(() => {
    async function loadMeals() {
      if (!plan) return;
      const allMeals = {};
      for (const day of days) {
        for (const slot of ["lunch", "dinner"]) {
          const id = plan[day]?.[slot];
          if (id && !allMeals[id]) {
            const meal = await lookupMeal(id);
            if (meal) allMeals[id] = meal;
          }
        }
      }
      setMeals(allMeals);
    }
    loadMeals();
  }, [plan]);

  //Mostra un messaggio di feedback temporaneo
  function showMessage(text, type = "info") {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  }

  //Rimuovi un pasto dal piano
  function removeMeal(day, slot) {
    const updated = { ...plan, [day]: { ...plan[day], [slot]: null } };
    setPlan(updated);
    savePlan(updated);
    showMessage(`Pasto rimosso da ${day} (${slot}).`, "success");
  }

  //Se ancora non c'è il piano
  if (!plan) return <p>Caricamento piano...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Piano Settimanale</h2>

      {/* Messaggio di conferma */}
      {message && (
        <div
          style={{
            margin: "1rem 0",
            padding: "10px 16px",
            borderRadius: "6px",
            background:
              message.type === "success"
                ? "rgba(34, 197, 94, 0.2)"
                : "rgba(239, 68, 68, 0.2)",
            color: message.type === "success" ? "#166534" : "#991b1b",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          {message.text}
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        {days.map((day) => (
          <div
            key={day}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              background: "var(--card-bg)",
            }}
          >
            <h3 style={{ textTransform: "capitalize", marginBottom: "0.5rem" }}>
              {day}
            </h3>
            {["lunch", "dinner"].map((slot) => (
              <div
                key={slot}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <strong style={{ width: "80px", textTransform: "capitalize" }}>
                  {slot}
                </strong>
                {plan[day]?.[slot] ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flex: 1,
                    }}
                  >
                    <img
                      src={meals[plan[day][slot]]?.thumb}
                      alt={meals[plan[day][slot]]?.title || ""}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontWeight: "600",
                          margin: 0,
                          fontSize: "15px",
                        }}
                      >
                        {meals[plan[day][slot]]?.title}
                      </p>
                      <button
                        className="btn ghost"
                        onClick={() => removeMeal(day, slot)}
                        style={{
                          marginTop: "4px",
                          padding: "4px 8px",
                          fontSize: "13px",
                        }}
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                ) : (
                  <em>- Vuoto -</em>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
