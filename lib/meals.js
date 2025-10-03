const API_BASE = "https://www.themealdb.com/api/json/v1/1";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

//Esportazioni nominate
export async function searchMeals(q = "") {
  try {
    const url = `${API_BASE}/search.php?s=${encodeURIComponent(q)}`;
    const json = await fetchJson(url);
    if (!json.meals) return [];
    return json.meals.map((raw) => ({
      id: raw.idMeal,
      title: raw.strMeal,
      category: raw.strCategory,
      area: raw.strArea,
      instructions: raw.strInstructions,
      thumb: raw.strMealThumb,
      raw,
    }));
  } catch (err) {
    console.error("searchMeals error:", err);
    return [];
  }
}

export async function lookupMeal(id) {
  try {
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
  } catch (err) {
    console.error("lookupMeal error:", err);
    return null;
  }
}

export async function listCategories() {
  try {
    const url = `${API_BASE}/list.php?c=list`;
    const json = await fetchJson(url);
    if (!json.meals) return [];
    return json.meals.map((m) => m.strCategory);
  } catch (err) {
    console.error("listCategories error:", err);
    return [];
  }
}
