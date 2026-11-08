import type { Task } from "../types/task";
import { TaskItem } from "./TaskItem";
import "./TaskList.scss";
interface Props {
  tasks: Task[];
  total: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
export function TaskList({ tasks, total, onToggle, onDelete }: Props) {
  if (!tasks.length)
    return (
      <div className="task-list__empty">
        <span>◇</span>
        <h3>
          {total === 0
            ? "Завдань поки немає."
            : "За цим фільтром завдань немає."}
        </h3>
        <p>
          {total === 0
            ? "Додайте перше навчальне завдання."
            : "Спробуйте вибрати інший фільтр."}
        </p>
      </div>
    );
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
