import { useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import { TaskStats } from "../components/TaskStats";
import { TaskFilters } from "../components/TaskFilters";
import { Toast } from "../components/Toast";
export function LocalPlanner() {
  const {
    tasks,
    filter,
    setFilter,
    addTask,
    updateTask,
    toggleTask,
    requestDelete,
    pending,
    undoDelete,
    resetTasks,
    toast,
  } = useTaskContext();
  const [editId, setEditId] = useState<string | null>(null);
  const editing = tasks.find((t) => t.id === editId && t.id !== pending);
  const visible = tasks.filter(
    (t) =>
      filter === "all" || (filter === "completed" ? t.completed : !t.completed),
  );
  return (
    <>
      <TaskStats tasks={tasks} />
      <div className="app__workspace">
        <TaskForm
          key={editing?.id ?? "new"}
          initialTask={editing}
          onCancel={() => setEditId(null)}
          onAdd={(draft) => {
            if (editing) updateTask(editing.id, draft);
            else addTask(draft);
            setEditId(null);
          }}
        />
        <section>
          <div className="app__tasks-heading">
            <h2>Мої завдання · №9</h2>
            <button
              onClick={() => {
                resetTasks();
                setEditId(null);
              }}
            >
              Скинути дані
            </button>
          </div>
          <TaskFilters tasks={tasks} filter={filter} onChange={setFilter} />
          {visible.length ? (
            <ul className="task-list">
              {visible.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  pending={task.id === pending}
                  onEdit={() => setEditId(task.id)}
                  onToggle={toggleTask}
                  onDelete={requestDelete}
                />
              ))}
            </ul>
          ) : (
            <div className="task-list__empty">
              {tasks.length
                ? "За цим фільтром завдань немає."
                : "Завдань поки немає. Додайте перше навчальне завдання."}
            </div>
          )}
        </section>
      </div>
      <Toast
        key={pending ?? toast}
        message={pending ? "Завдання буде видалено через 5 секунд." : toast}
        undo={pending ? undoDelete : undefined}
      />
    </>
  );
}
