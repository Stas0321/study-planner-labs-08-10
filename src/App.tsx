import { useState } from "react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TaskStats } from "./components/TaskStats";
import { TaskFilters } from "./components/TaskFilters";
import { TaskList } from "./components/TaskList";
import { initialTasks } from "./data/initialTasks";
import type { Task, TaskDraft, TaskFilter } from "./types/task";
import "./App.scss";
export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");
  function addTask(draft: TaskDraft) {
    setTasks((previous) => [
      ...previous,
      { ...draft, id: crypto.randomUUID(), completed: false },
    ]);
  }
  function toggleTask(id: string) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }
  function deleteTask(id: string) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }
  const visibleTasks = tasks.filter(
    (task) =>
      filter === "all" ||
      (filter === "completed" ? task.completed : !task.completed),
  );
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <section className="app__intro">
          <span className="app__eyebrow">ТВІЙ НАВЧАЛЬНИЙ ПРОСТІР</span>
          <h1>
            Крок за кроком до мети<span>.</span>
          </h1>
          <p>Плануй навчання, відстежуй прогрес і звільняй час для нового.</p>
        </section>
        <TaskStats tasks={tasks} />
        <div className="app__workspace">
          <TaskForm onAdd={addTask} />
          <section className="app__tasks" aria-label="Навчальні завдання">
            <div className="app__tasks-heading">
              <h2>Мої завдання</h2>
              <span>Кожен крок має значення</span>
            </div>
            <TaskFilters tasks={tasks} filter={filter} onChange={setFilter} />
            <TaskList
              tasks={visibleTasks}
              total={tasks.length}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </section>
        </div>
        <footer className="app__footer">
          Study Planner · Лабораторна робота №8
          <span>Дані зберігаються лише до перезавантаження сторінки.</span>
        </footer>
      </main>
    </div>
  );
}
