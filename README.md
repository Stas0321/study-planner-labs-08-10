# Study Planner · лабораторні №8–10

React 19, TypeScript, Vite; SCSS + BEM; ESLint. Один застосунок з двома режимами, які перемикаються вгорі сторінки.

## Запуск на Windows

Потрібен Node.js 22.22 або новіший.

```powershell
cd C:\Users\stas0\Desktop\WebReact
npm install
Copy-Item .env.example .env
npm run dev
```

Відкрити адресу Local з термінала (звичайно http://localhost:5173). `.env` уже створено в цій робочій папці; копіювання потрібне для нового клону. Змінивши `.env`, перезапустіть Vite. `VITE_API_URL` — публічна конфігурація, а не місце для секретів.

```powershell
npm run lint
npm run build
npm run preview
```

## Режими

- **№8–9 · Локальний планувальник**: функціонал №8, reducer, Context, редагування всіх полів, localStorage, заголовок вкладки, Toast, Undoable Delete з прогресом 5 секунд. Одне видалення одночасно; повторний запит показує повідомлення. Pending-стан не записується у сховище: перезавантаження скасовує незавершене видалення. «Скинути дані» повертає початкові завдання та скасовує таймер.
- **№10 · REST API**: список DummyJSON по 10 записів, попередня/наступна сторінка, GET деталей, POST, PATCH, DELETE з підтвердженням, loading/error/retry/empty/success. Попередні GET скасовуються при зміні сторінки, деталей або режиму.

В API-режимі статистика й фільтри стосуються завантаженої сторінки. Server state не записується в localStorage. При переході між режимами локальні дані відновлюються зі сховища.

## Обмеження DummyJSON

DummyJSON імітує POST/PATCH/DELETE без постійного збереження. UI оновлюється після успішної відповіді. Session-cache repository не дозволяє повторно показувати видалені або застарілі записи під час пагінації. Після перезавантаження зміни API скидаються.

description/category/priority — клієнтські метадані; HTTP передає лише підтримувані todo/completed/userId. Нові POST-записи отримують окремі клієнтські UUID, бо DummyJSON повторює синтетичний id. GET деталей новоствореного запису використовує відповідь POST із пам’яті, оскільки на сервері такого запису немає. PATCH і DELETE демонструйте на завданнях, завантажених GET; для нових записів застосунок чесно показує повідомлення про обмеження API.

Контракт: https://dummyjson.com/docs/todos

## Структура

- `src/components`: форма, список, завдання, фільтри, статистика, Toast, деталі; окремі SCSS-файли.
- `src/reducers/taskReducer.ts`: чистий reducer і типізовані actions.
- `src/context/TaskProvider.tsx`: локальний state, operations, effects і cleanup таймерів.
- `src/hooks`: useTaskContext та generic useLocalStorage.
- `src/api/httpClient.ts`: URL із env, fetch, перевірка response.ok, помилки.
- `src/repositories/taskRepository.ts`: endpoints, DTO/domain mapping, CRUD.
- `src/pages`: локальний та API-планувальники; незалежні джерела даних.

