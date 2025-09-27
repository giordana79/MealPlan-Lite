import { NextResponse } from "next/server";
//Path relativo da app/api/search/route.js a lib/meals.js
import { searchMeals } from "../../../lib/meals";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const c = searchParams.get("c") || "";

    //SearchMeals deve ritornare array di oggetti
    const arr = await searchMeals(q);
    const filtered = c
      ? arr.filter((m) => (m.category || "").toLowerCase() === c.toLowerCase())
      : arr;

    return NextResponse.json(filtered);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
