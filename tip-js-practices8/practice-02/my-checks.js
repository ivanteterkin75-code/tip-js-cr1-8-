// Собственные проверки ПР2 (дополняют checks.js, не заменяют его).
import assert from "node:assert/strict";
import { addTask, removeTask, renameTask, setTaskCompleted, getTaskStats } from "./src/task-service.js";
import { variantTasks } from "./src/data.js";

let passed = 0;
function check(name, action) {
  action();
  passed += 1;
  console.log(`OK: ${name}`);
}

// 1. Добавление после удаления: освободившийся id можно использовать снова.
check("Собственная 1: добавление после удаления того же id", () => {
  const tasks = variantTasks.map((t) => ({ ...t }));
  const removed = removeTask(tasks, 37);
  assert.equal(removed.ok, true);
  const added = addTask(removed.tasks, 37, "Новая задача на старом id", "high");
  assert.equal(added.ok, true);
  assert.deepEqual(added.tasks.map((t) => t.id), [11, 23, 41, 58, 64, 37]);
  assert.equal(tasks.length, 6, "исходный массив не изменился");
});

// 2. Изменение первой и последней записи; соседние объекты переиспользуются.
check("Собственная 2: изменение первой и последней записи", () => {
  const tasks = variantTasks.map((t) => ({ ...t }));
  const first = setTaskCompleted(tasks, 11, false);
  const last = setTaskCompleted(first.tasks, 64, true);
  assert.equal(last.tasks[0].completed, false);
  assert.equal(last.tasks[5].completed, true);
  assert.equal(last.tasks[2], tasks[2], "нетронутая запись не копируется");
  assert.equal(tasks[0].completed, true, "исходная первая запись не изменена");
  assert.equal(tasks[5].completed, false, "исходная последняя запись не изменена");
});

// 3. Последовательное обновление нескольких задач и итоговая сводка.
check("Собственная 3: цепочка операций и сводка", () => {
  let tasks = variantTasks.map((t) => ({ ...t }));
  tasks = setTaskCompleted(tasks, 41, true).tasks;
  tasks = setTaskCompleted(tasks, 58, true).tasks;
  tasks = renameTask(tasks, 64, "  Оформить CHANGELOG  ").tasks;
  tasks = removeTask(tasks, 11).tasks;
  assert.deepEqual(getTaskStats(tasks), { total: 5, completed: 4, pending: 1, progress: 80 });
  assert.equal(tasks[4].title, "Оформить CHANGELOG");
});

console.log(`\nСобственных проверок пройдено: ${passed}`);
