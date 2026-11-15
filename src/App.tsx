import { useState } from "react";
import { Header } from "./components/Header";
import { TaskProvider } from "./context/TaskProvider";
import { LocalPlanner } from "./pages/LocalPlanner";
import { ApiPlanner } from "./pages/ApiPlanner";
import "./components/TaskList.scss";
import "./App.scss";
export default function App() {
  const [mode, setMode] = useState<"local" | "api">("local");
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <section className="app__intro">
          <span className="app__eyebrow">ЛАБОРАТОРНІ РОБОТИ №8–10</span>
          <h1>
            Крок за кроком до мети<span>.</span>
          </h1>
          <p>Плануй навчання, відстежуй прогрес і звільняй час для нового.</p>
        </section>
        <nav className="app__modes" aria-label="Лабораторні">
          <button
            aria-pressed={mode === "local"}
            onClick={() => setMode("local")}
          >
            №8–9 · Локальний планувальник
          </button>
          <button aria-pressed={mode === "api"} onClick={() => setMode("api")}>
            №10 · REST API
          </button>
        </nav>
        {mode === "local" ? (
          <TaskProvider>
            <LocalPlanner />
          </TaskProvider>
        ) : (
          <ApiPlanner />
        )}
        <footer className="app__footer">
          Study Planner · React 19 + TypeScript
          <span>
            {mode === "local"
              ? "Завдання зберігаються у localStorage."
              : "Дані REST API та зміни поточної сесії."}
          </span>
        </footer>
      </main>
    </div>
  );
}
