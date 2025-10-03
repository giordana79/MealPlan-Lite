import Link from "next/link";
import Image from "next/image";

function safeText(val) {
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (val === null || val === undefined) return "";
  return JSON.stringify(val);
}

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
        <Image
          src={meal.thumb}
          alt={`Foto del piatto ${safeText(meal.title)}`}
          width={300}
          height={200}
          style={{ width: "100%", height: "auto", borderRadius: "6px" }}
        />
      </Link>
      <h3>{safeText(meal.title)}</h3>
      <p style={{ fontSize: "14px", color: "#555" }}>
        {safeText(meal.category)}
      </p>
    </div>
  );
}
