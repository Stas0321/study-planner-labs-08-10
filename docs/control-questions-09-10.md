# Контрольні запитання №9

1. State піднімають до найближчого спільного батька, коли він потрібний кільком компонентам.
2. Prop drilling — передавання даних через проміжні компоненти; Context дає доступ споживачам без такого ланцюжка.
3. Reducer обчислює наступний стан за поточним станом і action; він об’єднує правила пов’язаних переходів.
4. Чиста функція детермінована, не мутує аргументи, не має побічних ефектів.
5. Action описує подію й payload; dispatch передає action у reducer.
6. useReducer корисний для складних пов’язаних переходів; useState — для простих незалежних значень.
7. Context складається зі створення контексту, Provider з value і читання через useContext.
8. Ні: локальну форму, тимчасовий діалог і деталі доцільно залишити локально.
9. Side effect — взаємодія поза обчисленням розмітки: storage, DOM API, мережа, таймери.
10. useEffect синхронізує компонент із зовнішньою системою після commit.
11. Effect виконується після commit відповідно до dependencies; cleanup — перед наступним setup і на unmount. StrictMode додатково перевіряє setup/cleanup у development.
12. Запис localStorage змінює зовнішнє браузерне сховище.
13. Таймер — недетермінований side effect, він порушив би чистоту reducer.
14. clearTimeout не дає застарілому або демонтованому effect виконати відкладену дію.
15. Дублювання derived state створює ризик розсинхронізації й зайвих рендерів.
16. Custom Hook — функція use… для повторного використання логіки hooks, а не для автоматичного спільного state між викликами.
17. Hooks викликають на верхньому рівні React-компонента або hook, не умовно/в циклах; dependencies й cleanup мають відповідати використовуваним значенням.

# Контрольні запитання №10

1. REST API — інтерфейс роботи з ресурсами через HTTP за узгодженими URL і методами.
2. GET читає, POST створює, PUT зазвичай замінює ресурс, PATCH змінює частково, DELETE видаляє.
3. Винесена API-логіка не змішує UI з transport-деталями, полегшує зміни й перевірки.
4. Repository Pattern приховує отримання та збереження domain-об’єктів за спеціалізованими методами.
5. Task repository реалізує CRUD, пагінацію та mapping DTO/domain Task.
6. HTTP client керує transport, status і JSON; repository знає ресурс Task, endpoints та mapping.
7. Потрібні loading, success, error, empty; для mutation також pending і feedback, для GET — cancel та retry.
8. Server state походить із API; client/UI state — фільтр, сторінка, форма, selected id тощо.
9. Без продуманої політики кешування localStorage стає застарілою другою копією server state.
10. AbortController скасовує підтримувану операцію через AbortSignal.
11. Без cleanup запит може завершитись після unmount і марно використати ресурси; cleanup abort скасовує його, а перевірка signal запобігає застарілим оновленням.
12. fetch — браузерний API, HTTP error status не відхиляє Promise автоматично; Axios — бібліотека з додатковими можливостями та іншим стандартним handling HTTP-помилок.
13. Optimistic update змінює UI до відповіді сервера та потребує rollback при помилці. Тут mutations pessimistic: зміни після success.
14. Повернений POST-об’єкт можна додати до client state, React оновить UI без reload.
15. Перевірити response.ok, нормалізувати помилку, показати зрозумілий feedback/retry; AbortError не показувати як звичайний збій.
