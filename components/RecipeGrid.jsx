import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ meals }) {
  if (!meals || meals.length === 0) return <p>Nessun risultato.</p>;
  return (
    <div className="grid">
      {meals.map((m) => (
        <RecipeCard key={m.id} meal={m} />
      ))}
    </div>
  );
}
