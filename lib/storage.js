const FAV_KEY = "mealplan:favorites";
const PLAN_KEY = "mealplan:plan";
const THEME_KEY = "mealplan:theme";

export function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
  } catch {
    return [];
  }
}
export function saveFavorites(arr) {
  localStorage.setItem(FAV_KEY, JSON.stringify(arr));
}
export function isFav(id) {
  return readFavorites().includes(id);
}
export function toggleFav(id) {
  const arr = readFavorites();
  const i = arr.indexOf(id);
  if (i >= 0) {
    arr.splice(i, 1);
  } else arr.push(id);
  saveFavorites(arr);
  return arr;
}

//Struttura piano settimanale: { monday: { lunch: id|null, dinner: id|null }, ... }
export function readPlan() {
  try {
    return JSON.parse(localStorage.getItem(PLAN_KEY) || "{}");
  } catch {
    return {};
  }
}
export function savePlan(plan) {
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
export function readTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

export const defaultPlanTemplate = () => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const obj = {};
  days.forEach((d) => (obj[d] = { lunch: null, dinner: null }));
  return obj;
};
