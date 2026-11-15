import { priorityLabels } from "../types/task";
import type { Task } from "../types/task";
import "./TaskItem.scss";
interface Props {
  task: Task;
  pending?: boolean;
  disabled?: boolean;
  onEdit?: () => void;
  onDetails?: () => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
export function TaskItem({
  task,
  onToggle,
  onDelete,
  pending,
  disabled,
  onEdit,
  onDetails,
}: Props) {
  return (
    <li className={`task-item${task.completed ? " task-item--completed" : ""}`}>
      {pending && <span>Буде видалено…</span>}
      <input
        disabled={pending || disabled}
        className="task-item__check"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`${task.completed ? "Повернути до невиконаних" : "Позначити виконаним"}: ${task.title}`}
      />
      <div className="task-item__body">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div className="task-item__meta">
          <span className="task-item__category">{task.category}</span>
          <span
            className={`task-item__priority task-item__priority--${task.priority}`}
          >
            ● {priorityLabels[task.priority]}
          </span>
          <span className="task-item__status">
            {task.completed ? "Виконано" : "Не виконано"}
          </span>
        </div>
      </div>
      {onEdit && (
        <button disabled={pending || disabled} onClick={onEdit}>
          Редагувати
        </button>
      )}
      {onDetails && (
        <button disabled={pending || disabled} onClick={onDetails}>
          Деталі
        </button>
      )}
      <button
        disabled={pending || disabled}
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Видалити: ${task.title}`}
        title="Видалити завдання"
      >
        ×
      </button>
    </li>
  );
}
