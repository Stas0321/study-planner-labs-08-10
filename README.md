# Study Planner · лабораторна №10

React 19, TypeScript, Vite; SCSS + BEM; ESLint. Гілка `lab-10` одразу відкриває REST API-планувальник. Попередні етапи доступні в гілках `lab-08` та `lab-09`; підсумкова версія з двома режимами — у `main`.

## Запуск на Windows

Потрібен Node.js 22.22 або новіший.

```powershell
git clone --branch lab-10 https://github.com/Stas0321/study-planner-labs-08-10.git
cd study-planner-labs-08-10
npm install
Copy-Item .env.example .env
npm run dev
```

Відкрити адресу Local з термінала (звичайно http://localhost:5173). `.env` уже створено в цій робочій папці; копіювання потрібне для нового клону. Змінивши `.env`, перезапустіть Vite. `VITE_API_URL` — публічна конфігурація, а не місце для секретів.

```powershell
npm run lint
npm test
npm run build
npm run preview
```

## Режими

- **№10 · REST API**: список DummyJSON по 10 записів, попередня/наступна сторінка, GET деталей, POST, PATCH, DELETE з підтвердженням, loading/error/retry/empty/success. Попередні GET скасовуються при зміні сторінки, деталей або режиму.

В API-режимі статистика й фільтри стосуються завантаженої сторінки. Server state не записується в localStorage. Локальний планувальник зі збереженням даних запускайте з гілки `lab-09`.

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

