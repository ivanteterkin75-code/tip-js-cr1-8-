// Общий контрольный набор. Для своего варианта ниже предусмотрен отдельный массив.
// Идентификатор задачи не совпадает с её индексом в массиве.
export const demoTasks = [
  { id: 1, title: "Изучить функции", completed: true, priority: "medium" },
  { id: 4, title: "Подготовить модель задач", completed: false, priority: "high" },
  { id: 7, title: "Проверить методы массивов", completed: false, priority: "low" },
  { id: 10, title: "Оформить README", completed: true, priority: "medium" },
];

// Индивидуальный вариант 8: «Оформление технической документации».
// Изначально выполнены первые K = 3 задачи. Приоритет новой задачи id = 80 — low.
export const variantNumber = 8;
export const variantTasks = [
  { id: 11, title: "Составить структуру README", completed: true, priority: "high" },
  { id: 23, title: "Описать инструкцию запуска проекта", completed: true, priority: "medium" },
  { id: 37, title: "Задокументировать публичные функции", completed: true, priority: "high" },
  { id: 41, title: "Добавить примеры использования", completed: false, priority: "medium" },
  { id: 58, title: "Проверить орфографию и ссылки", completed: false, priority: "low" },
  { id: 64, title: "Оформить список изменений", completed: false, priority: "low" },
];
