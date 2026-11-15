import type { Task, TaskDraft } from "../types/task";
export interface TaskState {
  tasks: Task[];
  pending: string | null;
}
export type TaskAction =
  | { type: "add"; task: Task }
  | { type: "toggle"; id: string }
  | { type: "update"; id: string; draft: TaskDraft }
  | { type: "requestDelete"; id: string }
  | { type: "confirmDelete" }
  | { type: "undoDelete" }
  | { type: "reset"; tasks: Task[] };
export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "add":
      return { ...state, tasks: [...state.tasks, action.task] };
    case "toggle":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id && t.id !== state.pending
            ? { ...t, completed: !t.completed }
            : t,
        ),
      };
    case "update":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id && t.id !== state.pending
            ? { ...t, ...action.draft }
            : t,
        ),
      };
    case "requestDelete":
      return state.pending ? state : { ...state, pending: action.id };
    case "confirmDelete":
      return {
        tasks: state.tasks.filter((t) => t.id !== state.pending),
        pending: null,
      };
    case "undoDelete":
      return { ...state, pending: null };
    case "reset":
      return { tasks: action.tasks, pending: null };
  }
}
export function isTasks(value: unknown): value is Task[] {
  return (
    Array.isArray(value) &&
    value.every(
      (t) =>
        t &&
        typeof t.id === "string" &&
        typeof t.title === "string" &&
        typeof t.description === "string" &&
        typeof t.category === "string" &&
        typeof t.completed === "boolean" &&
        ["low", "medium", "high"].includes(t.priority),
    ) &&
    new Set(value.map((t) => t.id)).size === value.length
  );
}
