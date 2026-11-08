import type { Task } from "../types/task";
export const initialTasks: Task[] = [
  {
    id: "react",
    title: "React Components",
    description: "Опрацювати компоненти, JSX та передачу даних через props.",
    category: "React",
    priority: "high",
    completed: false,
  },
  {
    id: "typescript",
    title: "TypeScript Exercises",
    description: "Виконати вправи з типізації об’єктів та масивів.",
    category: "TypeScript",
    priority: "medium",
    completed: true,
  },
  {
    id: "state",
    title: "Практика з useState",
    description: "Повторити незмінне оновлення стану та обробку подій.",
    category: "React",
    priority: "medium",
    completed: false,
  },
];
