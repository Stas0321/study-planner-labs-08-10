import { useState } from "react";
import type { FormEvent } from "react";
import { priorityLabels } from "../types/task";
import type { Priority, TaskDraft, Task } from "../types/task";
import "./TaskForm.scss";
interface Props {
  onAdd: (task: TaskDraft) => void | Promise<void>;
  disabled?: boolean;
  initialTask?: Task;
  onCancel?: () => void;
}
export function TaskForm({ onAdd, initialTask, onCancel, disabled }: Props) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? "",
  );
  const [category, setCategory] = useState(initialTask?.category ?? "");
  const [priority, setPriority] = useState<Priority>(
    initialTask?.priority ?? "medium",
  );
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    if (!title.trim()) {
      setError("Введіть назву завдання.");
      return;
    }
    setBusy(true);
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim(),
        category: category.trim() || "Без категорії",
        priority,
      });
      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("medium");
      setError("");
      setNotice(initialTask ? "Зміни збережено." : "Завдання додано.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Помилка збереження");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="task-form">
      <div className="task-form__heading">
        <span className="task-form__icon">＋</span>
        <h2>{initialTask ? "Редагування завдання" : "Нове завдання"}</h2>
      </div>
      <p>Маленький крок до великих знань.</p>
      <form onSubmit={submit} noValidate>
        <fieldset
          disabled={busy || disabled}
          style={{
            border: 0,
            padding: 0,
            margin: 0,
            minWidth: 0,
            display: "contents",
          }}
        >
          <label htmlFor="title">
            Назва <span aria-hidden="true">*</span>
          </label>
          <input
            id="title"
            value={title}
            maxLength={120}
            required
            aria-invalid={!!error}
            aria-describedby={error ? "title-error" : undefined}
            placeholder="Що плануєш вивчити?"
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
              setNotice("");
            }}
          />
          {error && (
            <p className="task-form__error" id="title-error" role="alert">
              {error}
            </p>
          )}
          <label htmlFor="description">Опис</label>
          <textarea
            id="description"
            value={description}
            maxLength={600}
            rows={3}
            placeholder="Додай деталі або короткий план…"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="category">Категорія</label>
          <input
            id="category"
            value={category}
            maxLength={40}
            placeholder="Наприклад, React"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="priority">Пріоритет</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            {Object.entries(priorityLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button className="task-form__submit" type="submit">
            {busy
              ? "Збереження…"
              : initialTask
                ? "Зберегти зміни"
                : "＋ Додати завдання"}
          </button>
          <span className="task-form__notice" role="status">
            {notice}
          </span>
          {initialTask && (
            <button type="button" onClick={onCancel}>
              Скасувати редагування
            </button>
          )}
        </fieldset>
      </form>
    </section>
  );
}
