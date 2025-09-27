import Link from "next/link";

export default function RecipeCard({ meal }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        background: "#fff",
      }}
    >
      <Link href={`/recipes/${meal.id}`}>
        <img
          src={meal.thumb}
          alt={meal.title}
          style={{ width: "100%", borderRadius: "6px" }}
        />
      </Link>
      <h3>{meal.title}</h3>
      <p style={{ fontSize: "14px", color: "#555" }}>{meal.category}</p>
    </div>
  );
}
