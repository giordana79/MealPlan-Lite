import "./globals.css";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: "MealPlan Lite",
  description: "Mini app ricette con Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <header className="header">
          <div className="container header-container">
            <h1 className="brand">
              <Link href="/">MealPlan</Link>
            </h1>

            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/plan">Piano</Link>
              <Link href="/favorites">Preferiti</Link>
            </nav>

            <ThemeToggle />
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
