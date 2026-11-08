import { useState } from "react";
import type { FormEvent } from "react";
import { priorityLabels } from "../types/task";
import type { Priority, TaskDraft } from "../types/task";
import "./TaskForm.scss";
interface Props {
  onAdd: (task: TaskDraft) => void;
}
export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    if (!title.trim()) {
      setError("Введіть назву завдання.");
      return;
    }
    onAdd({
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
    setNotice("Завдання додано.");
  }
  return (
    <section className="task-form">
      <div className="task-form__heading">
        <span className="task-form__icon">＋</span>
        <h2>Нове завдання</h2>
      </div>
      <p>Маленький крок до великих знань.</p>
      <form onSubmit={submit} noValidate>
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
          ＋ Додати завдання
        </button>
        <span className="task-form__notice" role="status">
          {notice}
        </span>
      </form>
    </section>
  );
}
