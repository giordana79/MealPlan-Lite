// app/page.js (Server Component)
import { listCategories } from "../lib/meals";
import HomeClient from "../components/HomeClient";

//Da vedere
import SearchBar from "../components/SearchBar";
import RecipeGrid from "../components/RecipeGrid";
import Pagination from "../components/Pagination";

export default async function Home() {
  //Fetch lato server (Server Component)
  const categories = await listCategories();
  return (
    <div>
      <h2>Ricette</h2>
      <HomeClient categories={categories} />
    </div>
  );
}
