const baseURL = import.meta.env.VITE_API_URL;
export async function httpClient<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!baseURL)
    throw new Error(
      "Не задано VITE_API_URL. Перевірте .env та перезапустіть Vite.",
    );
  const response = await fetch(`${baseURL.replace(/\/$/, "")}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok)
    throw new Error(`Помилка HTTP ${response.status}. Спробуйте ще раз.`);
  return response.json() as Promise<T>;
}
export function errorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Не вдалося виконати операцію.";
}
