import { useEffect, useReducer, useState } from "react";
import type { ReactNode } from "react";
import { TaskContext } from "./taskContext";
import { taskReducer, isTasks } from "../reducers/taskReducer";
import { initialTasks } from "../data/initialTasks";
import { readStored, useLocalStorage } from "../hooks/useLocalStorage";
import type { TaskDraft, TaskFilter } from "../types/task";
const validFilter = (v: unknown): v is TaskFilter =>
  v === "all" || v === "active" || v === "completed";
export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, undefined, () => ({
    tasks: readStored("study-planner.tasks", initialTasks, isTasks),
    pending: null,
  }));
  const [filter, setFilter] = useLocalStorage(
    "study-planner.filter",
    "all",
    validFilter,
  );
  const [toast, setToast] = useState("");
  // Storage failures must be reported after attempting the external write.
  useEffect(() => {
    try {
      localStorage.setItem("study-planner.tasks", JSON.stringify(state.tasks));
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- report failure of external persistence, not derived state
      setToast("Не вдалося зберегти дані. Зміни доступні лише в цій сесії.");
    }
  }, [state.tasks]);
  useEffect(() => {
    document.title = `Study Planner — ${state.tasks.filter((t) => !t.completed).length} невиконаних`;
  }, [state.tasks]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (!state.pending) return;
    const timer = setTimeout(() => {
      dispatch({ type: "confirmDelete" });
      setToast("Завдання остаточно видалено.");
    }, 5000);
    return () => clearTimeout(timer);
  }, [state.pending]);
  function addTask(draft: TaskDraft) {
    dispatch({
      type: "add",
      task: { ...draft, id: crypto.randomUUID(), completed: false },
    });
    setToast("Завдання створено.");
  }
  function updateTask(id: string, draft: TaskDraft) {
    dispatch({ type: "update", id, draft });
    setToast("Зміни збережено.");
  }
  return (
    <TaskContext.Provider
      value={{
        ...state,
        filter,
        setFilter,
        toast,
        addTask,
        updateTask,
        toggleTask: (id) => dispatch({ type: "toggle", id }),
        requestDelete: (id) => {
          if (state.pending) {
            setToast("Спершу скасуйте або дочекайтеся поточного видалення.");
            return;
          }
          dispatch({ type: "requestDelete", id });
        },
        undoDelete: () => {
          dispatch({ type: "undoDelete" });
          setToast("Видалення скасовано.");
        },
        resetTasks: () => {
          dispatch({ type: "reset", tasks: initialTasks });
          setFilter("all");
          setToast("Початкові дані відновлено.");
        },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
