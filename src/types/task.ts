export type Priority = "low" | "medium" | "high";
export type TaskFilter = "all" | "active" | "completed";
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  category: string;
}
export type TaskDraft = Omit<Task, "id" | "completed">;
export const priorityLabels: Record<Priority, string> = {
  low: "Низький",
  medium: "Середній",
  high: "Високий",
};
