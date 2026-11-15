import { useContext } from "react";
import { TaskContext } from "../context/taskContext";
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error(
      "useTaskContext потрібно використовувати всередині TaskProvider",
    );
  return context;
}
