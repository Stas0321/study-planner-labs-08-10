import { useEffect, useState } from "react";
import type { Task, TaskDraft, TaskFilter } from "../types/task";
import { taskRepository } from "../repositories/taskRepository";
import { errorMessage } from "../api/httpClient";
import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import { TaskStats } from "../components/TaskStats";
import { TaskFilters } from "../components/TaskFilters";
import { TaskDetails } from "../components/TaskDetails";
import { Toast } from "../components/Toast";
import "./ApiPlanner.scss";
export function ApiPlanner() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [editing, setEditing] = useState<Task | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Task | null>(null);
  const [filter, setFilter] = useState<TaskFilter>("all");
  useEffect(() => {
    const controller = new AbortController();
    taskRepository
      .getAll(page, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setTasks(result.tasks);
        setTotal(result.total);
        setStatus("success");
      })
      .catch((e) => {
        if (controller.signal.aborted) return;
        setError(errorMessage(e));
        setStatus("error");
      });
    return () => controller.abort();
  }, [page, retry]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    document.title = `Study Planner — REST API · сторінка ${page}`;
  }, [page]);
  async function save(draft: TaskDraft) {
    setBusy(true);
    try {
      if (editing) {
        const task = await taskRepository.update({ ...editing, ...draft });
        setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
      } else {
        const task = await taskRepository.create(draft);
        setTasks((prev) => [task, ...prev]);
      }
      setEditing(null);
      setToast("Успішно збережено.");
    } catch (e) {
      setToast(errorMessage(e));
      throw e;
    } finally {
      setBusy(false);
    }
  }
  async function toggle(task: Task) {
    setBusy(true);
    try {
      const updated = await taskRepository.update({
        ...task,
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setToast("Стан оновлено.");
    } catch (e) {
      setToast(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!deleting) return;
    setBusy(true);
    try {
      await taskRepository.delete(deleting.id);
      setTasks((prev) => prev.filter((t) => t.id !== deleting.id));
      if (editing?.id === deleting.id) setEditing(null);
      if (selected === deleting.id) setSelected(null);
      setDeleting(null);
      setToast("Завдання видалено.");
    } catch (e) {
      setToast(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  function move(next: number) {
    setStatus("loading");
    setPage(next);
    setEditing(null);
    setSelected(null);
    setDeleting(null);
  }
  const visible = tasks.filter(
    (t) =>
      filter === "all" || (filter === "completed" ? t.completed : !t.completed),
  );
  return (
    <div className="api-planner">
      <p className="api-planner__note">
        №10 · REST API. Статистика та фільтри — для завантаженої сторінки.
        DummyJSON імітує зміни; вони не зберігаються на сервері. Нові записи
        доступні в поточному списку, PATCH/DELETE демонструйте на серверних
        записах.
      </p>
      <TaskStats tasks={status === "success" ? tasks : []} />
      <div className="app__workspace">
        <TaskForm
          disabled={busy || status !== "success"}
          key={editing?.id ?? "new"}
          initialTask={editing ?? undefined}
          onCancel={() => setEditing(null)}
          onAdd={save}
        />
        <section>
          <h2>Завдання з API</h2>
          <nav className="api-planner__pagination" aria-label="Пагінація">
            <button
              disabled={page === 1 || busy}
              onClick={() => move(page - 1)}
            >
              Попередня
            </button>
            <span>
              Сторінка {page} / {Math.max(1, Math.ceil(total / 10))} · На
              сервері: {total}
            </span>
            <button
              disabled={busy || (status === "success" && page * 10 >= total)}
              onClick={() => move(page + 1)}
            >
              Наступна
            </button>
          </nav>
          {status === "loading" ? (
            <p role="status">Завантаження…</p>
          ) : status === "error" ? (
            <div role="alert">
              <p>{error}</p>
              <button
                onClick={() => {
                  setStatus("loading");
                  setRetry((n) => n + 1);
                }}
              >
                Спробувати ще
              </button>
            </div>
          ) : (
            <>
              <TaskFilters tasks={tasks} filter={filter} onChange={setFilter} />
              {busy && <p role="status">Виконується операція…</p>}
              {deleting && (
                <div
                  className="api-planner__confirm"
                  role="group"
                  aria-label="Підтвердження видалення"
                >
                  <p>Видалити «{deleting.title}»?</p>
                  <button disabled={busy} onClick={() => void remove()}>
                    Підтвердити видалення
                  </button>
                  <button disabled={busy} onClick={() => setDeleting(null)}>
                    Скасувати
                  </button>
                </div>
              )}
              {selected && (
                <TaskDetails
                  key={selected}
                  id={selected}
                  onClose={() => setSelected(null)}
                />
              )}
              <ul className="task-list">
                {visible.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    disabled={busy}
                    onToggle={() => void toggle(task)}
                    onDelete={() => setDeleting(task)}
                    onEdit={() => setEditing(task)}
                    onDetails={() => setSelected(task.id)}
                  />
                ))}
              </ul>
              {!visible.length && (
                <div className="task-list__empty">
                  {tasks.length
                    ? "За цим фільтром завдань немає."
                    : "Завдань не знайдено."}
                </div>
              )}
            </>
          )}
        </section>
      </div>
      <Toast message={toast} />
    </div>
  );
}
