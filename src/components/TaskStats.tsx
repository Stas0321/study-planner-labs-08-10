import type { Task } from "../types/task";
import "./TaskStats.scss";
export function TaskStats({ tasks }: { tasks: Task[] }) {
  const completed = tasks.filter((task) => task.completed).length;
  return (
    <section className="task-stats" aria-label="Статистика завдань">
      {[
        [tasks.length, "Усього завдань", "total"],
        [tasks.length - completed, "У процесі", "active"],
        [completed, "Виконано", "done"],
      ].map(([value, label, tone]) => (
        <div
          key={label}
          className={`task-stats__card task-stats__card--${tone}`}
        >
          <span className="task-stats__value">{value}</span>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
