import type { Task, TaskFilter } from "../types/task";
import "./TaskFilters.scss";
interface Props {
  tasks: Task[];
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
}
export function TaskFilters({ tasks, filter, onChange }: Props) {
  const options: { value: TaskFilter; label: string; count: number }[] = [
    { value: "all", label: "Всі", count: tasks.length },
    {
      value: "active",
      label: "Не виконані",
      count: tasks.filter((t) => !t.completed).length,
    },
    {
      value: "completed",
      label: "Виконані",
      count: tasks.filter((t) => t.completed).length,
    },
  ];
  return (
    <div className="task-filters" role="group" aria-label="Фільтр завдань">
      {options.map((option) => (
        <button
          key={option.value}
          className={`task-filters__button${filter === option.value ? " task-filters__button--active" : ""}`}
          aria-pressed={filter === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          <span>{option.count}</span>
        </button>
      ))}
    </div>
  );
}
