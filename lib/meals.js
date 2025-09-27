const API_BASE = "https://www.themealdb.com/api/json/v1/1";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API error: " + res.status);
  return res.json();
}

export async function searchMeals(q = "") {
  const url = `${API_BASE}/search.php?s=${encodeURIComponent(q || "")}`;
  const json = await fetchJson(url);
  //json.meals può essere null -> ritorna array vuoto
  return (json.meals || []).map((raw) => ({
    id: raw.idMeal,
    title: raw.strMeal,
    category: raw.strCategory,
    area: raw.strArea,
    instructions: raw.strInstructions,
    thumb: raw.strMealThumb,
    //Mantiene i raw fields se servono
    strMeal: raw.strMeal,
    strCategory: raw.strCategory,
    strArea: raw.strArea,
    strMealThumb: raw.strMealThumb,
    raw,
  }));
}

export async function lookupMeal(id) {
  const url = `${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`;
  const json = await fetchJson(url);
  if (!json.meals) return null;
  const raw = json.meals[0];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = raw[`strIngredient${i}`];
    const measure = raw[`strMeasure${i}`];
    if (ing && ing.trim())
      ingredients.push({
        ingredient: ing.trim(),
        measure: (measure || "").trim(),
      });
  }
  return {
    id: raw.idMeal,
    title: raw.strMeal,
    category: raw.strCategory,
    area: raw.strArea,
    instructions: raw.strInstructions,
    thumb: raw.strMealThumb,
    ingredients,
    raw,
  };
}

export async function listCategories() {
  const url = `${API_BASE}/list.php?c=list`;
  const json = await fetchJson(url);
  return (json.meals || []).map((m) => m.strCategory);
}
