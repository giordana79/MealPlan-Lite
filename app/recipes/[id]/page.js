import { lookupMeal } from "../../../lib/meals";
import RecipeActions from "../../../components/RecipeActions";

export default async function RecipePage({ params }) {
  const { id } = await params; //await obbligatorio
  const meal = await lookupMeal(id);

  if (!meal) {
    return <p>Ricetta non trovata.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{meal.title}</h2>
      <img
        src={meal.thumb}
        alt={meal.title}
        style={{ maxWidth: "480px", width: "100%", borderRadius: "8px" }}
      />
      <p style={{ fontSize: "14px", color: "#555" }}>
        {meal.category} • {meal.area}
      </p>

      <h3>Ingredienti</h3>
      <ul>
        {meal.ingredients.map((it, idx) => (
          <li key={idx}>
            {it.measure} {it.ingredient}
          </li>
        ))}
      </ul>

      <h3>Istruzioni</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>{meal.instructions}</pre>

      {/* Client component per i pulsanti */}
      <RecipeActions mealId={meal.id} />
    </div>
  );
}
