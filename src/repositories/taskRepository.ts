import { httpClient } from "../api/httpClient";
import type { Task, TaskDraft } from "../types/task";
interface ApiTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
interface TodosResponse {
  todos: ApiTodo[];
  total: number;
  skip: number;
  limit: number;
}
const metadata = new Map<string, TaskDraft>();
// DummyJSON repeats synthetic POST ids and does not persist mutations.
// Keep session identities distinct, while sending only supported DTO fields.
const created = new Map<string, Task>();
const overrides = new Map<string, Task>();
const deleted = new Set<string>();
function toTask(dto: ApiTodo): Task {
  const id = String(dto.id);
  return {
    ...{
      id,
      title: dto.todo,
      description: "",
      priority: "medium" as const,
      category: "General",
      completed: dto.completed,
    },
    ...metadata.get(id),
  };
}
export const taskRepository = {
  async getAll(page: number, signal?: AbortSignal) {
    const data = await httpClient<TodosResponse>(
      `/todos?limit=10&skip=${(page - 1) * 10}`,
      { signal },
    );
    return {
      tasks: data.todos
        .map(toTask)
        .filter((t) => !deleted.has(t.id))
        .map((t) => overrides.get(t.id) ?? t),
      total: data.total,
    };
  },
  async getById(id: string, signal?: AbortSignal) {
    if (created.has(id)) return created.get(id)!;
    const task = toTask(
      await httpClient<ApiTodo>(`/todos/${encodeURIComponent(id)}`, { signal }),
    );
    return overrides.get(id) ?? task;
  },
  async create(draft: TaskDraft) {
    const dto = await httpClient<ApiTodo>("/todos/add", {
      method: "POST",
      body: JSON.stringify({ todo: draft.title, completed: false, userId: 1 }),
    });
    const task = { ...toTask(dto), ...draft, id: `new-${crypto.randomUUID()}` };
    created.set(task.id, task);
    return task;
  },
  async update(task: Task) {
    if (created.has(task.id))
      throw new Error(
        "DummyJSON не зберігає нові записи: редагуйте завдання, отримане із сервера.",
      );
    const dto = await httpClient<ApiTodo>(
      `/todos/${encodeURIComponent(task.id)}`,
      {
        method: "PATCH",
        body: JSON.stringify({ todo: task.title, completed: task.completed }),
      },
    );
    metadata.set(task.id, task);
    const result = { ...toTask(dto), ...task };
    overrides.set(task.id, result);
    return result;
  },
  async delete(id: string) {
    if (created.has(id))
      throw new Error(
        "DummyJSON не зберігає нові записи: DELETE можна показати на серверному завданні.",
      );
    await httpClient(`/todos/${encodeURIComponent(id)}`, { method: "DELETE" });
    deleted.add(id);
  },
};
