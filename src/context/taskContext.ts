import { createContext } from "react";
import type { Task, TaskDraft, TaskFilter } from "../types/task";
export interface TaskContextValue {
  tasks: Task[];
  pending: string | null;
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  addTask: (draft: TaskDraft) => void;
  updateTask: (id: string, draft: TaskDraft) => void;
  toggleTask: (id: string) => void;
  requestDelete: (id: string) => void;
  undoDelete: () => void;
  resetTasks: () => void;
  toast: string;
}
export const TaskContext = createContext<TaskContextValue | null>(null);
