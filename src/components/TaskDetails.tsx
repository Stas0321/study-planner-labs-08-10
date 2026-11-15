import { useEffect, useState } from "react";
import { taskRepository } from "../repositories/taskRepository";
import { errorMessage } from "../api/httpClient";
import type { Task } from "../types/task";
import { priorityLabels } from "../types/task";
import "./TaskDetails.scss";
export function TaskDetails({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    taskRepository
      .getById(id, controller.signal)
      .then((t) => {
        if (!controller.signal.aborted) setTask(t);
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(errorMessage(e));
      });
    return () => controller.abort();
  }, [id, retry]);
  return (
    <section className="task-details" aria-label="Деталі завдання">
      <button onClick={onClose}>Закрити деталі</button>
      {error ? (
        <p role="alert">
          {error}{" "}
          <button
            onClick={() => {
              setError("");
              setRetry((n) => n + 1);
            }}
          >
            Повторити
          </button>
        </p>
      ) : task ? (
        <>
          <h2>{task.title}</h2>
          <p>Опис: {task.description || "Не задано"}</p>
          <p>Категорія: {task.category}</p>
          <p>Пріоритет: {priorityLabels[task.priority]}</p>
          <p>Стан: {task.completed ? "Виконано" : "Не виконано"}</p>
          {id.startsWith("new-") && (
            <p>
              Новий запис доступний лише в цій сесії: API не зберігає його для
              GET.
            </p>
          )}
        </>
      ) : (
        <p role="status">Завантаження деталей…</p>
      )}
    </section>
  );
}
