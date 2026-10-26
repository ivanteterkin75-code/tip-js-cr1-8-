import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

// ---------- вспомогательный вывод (вычислений здесь нет) ----------

function printStats(label, tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  if (total === 0) {
    console.log(`${label}: Всего: 0; выполнено: 0; осталось: 0. Задач пока нет`);
    return;
  }
  console.log(
    `${label}: Всего: ${total}; выполнено: ${completed}; осталось: ${pending}; ` +
      `прогресс: ${progress.toFixed(1)}%`,
  );
}

// Применяет результат операции: при успехе возвращает новый массив,
// при отказе печатает ошибку и возвращает прежний.
function apply(tasks, result, label) {
  if (result.ok) {
    printStats(label, result.tasks);
    return result.tasks;
  }
  console.error(`Ошибка (${label}): ${result.error}`);
  return tasks;
}

function snapshot(tasks) {
  return JSON.stringify(tasks);
}

// ---------- общий сценарий (раздел 6.5) ----------

console.log("=== Общий сценарий: demoTasks ===");
const demoBefore = snapshot(demoTasks);

let currentTasks = demoTasks;

console.log("Исходные задачи:");
console.table(currentTasks);
console.log("Названия:", getTaskTitles(currentTasks));
console.log("Невыполненные id:", getPendingTasks(currentTasks).map((t) => t.id));
console.log("Найдена задача id = 4:", findTaskById(currentTasks, 4));
printStats("Исходный набор", currentTasks);

currentTasks = apply(
  currentTasks,
  addTask(currentTasks, 20, "Добавить проверку", "high"),
  "После добавления id = 20",
);
currentTasks = apply(
  currentTasks,
  setTaskCompleted(currentTasks, 4, true),
  "После выполнения id = 4",
);
currentTasks = apply(
  currentTasks,
  renameTask(currentTasks, 10, "Подготовить инструкцию запуска"),
  "После переименования id = 10",
);
currentTasks = apply(currentTasks, removeTask(currentTasks, 7), "После удаления id = 7");

console.log("Идентификаторы итогового списка:", currentTasks.map((t) => t.id));
console.table(currentTasks);

// Обработанный отказ: повторный id. Состояние не заменяется.
const countBeforeFailure = currentTasks.length;
currentTasks = apply(
  currentTasks,
  addTask(currentTasks, 20, "Дубликат", "low"),
  "Попытка повторно добавить id = 20",
);
console.log(
  `После отказа задач по-прежнему ${currentTasks.length} (было ${countBeforeFailure})`,
);

console.log(
  "demoTasks не изменён:",
  snapshot(demoTasks) === demoBefore,
  `(задач: ${demoTasks.length}, id: ${demoTasks.map((t) => t.id)})`,
);

// ---------- индивидуальный вариант (раздел 7) ----------

console.log(`\n=== Индивидуальный вариант ${variantNumber}: variantTasks ===`);
const variantBefore = snapshot(variantTasks);

let variantCurrent = variantTasks;

console.log("Исходные данные:");
console.table(variantCurrent);
printStats("Исходный набор", variantCurrent);

variantCurrent = apply(
  variantCurrent,
  addTask(variantCurrent, 80, "Проверить оформление таблиц", "low"),
  "После добавления id = 80",
);
variantCurrent = apply(
  variantCurrent,
  setTaskCompleted(variantCurrent, 11, true),
  "После completed = true для id = 11",
);
variantCurrent = apply(
  variantCurrent,
  renameTask(variantCurrent, 23, "  Описать порядок установки и запуска  "),
  "После переименования id = 23",
);
variantCurrent = apply(variantCurrent, removeTask(variantCurrent, 37), "После удаления id = 37");

// Повторное добавление id = 80 — отказ без изменения списка.
const idsBeforeFailure = variantCurrent.map((t) => t.id);
variantCurrent = apply(
  variantCurrent,
  addTask(variantCurrent, 80, "Ещё одна задача", "low"),
  "Повторное добавление id = 80",
);
console.log(
  "Список после отказа не изменился:",
  JSON.stringify(idsBeforeFailure) === JSON.stringify(variantCurrent.map((t) => t.id)),
);

console.log("Итоговые задачи:");
console.table(variantCurrent);
printStats("Итог", variantCurrent);
console.log(
  "variantTasks не изменён:",
  snapshot(variantTasks) === variantBefore,
  `(задач: ${variantTasks.length}, id: ${variantTasks.map((t) => t.id)})`,
);
