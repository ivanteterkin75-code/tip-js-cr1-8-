"use strict";

// Данные варианта 8
const totalTasks = 14;
const completedTasks = 4;

const MAX_TASKS = 1000;

function isCount(value) {
  return typeof value === "number" && Number.isInteger(value);
}

if (!isCount(totalTasks) || !isCount(completedTasks)) {
  console.log("Ошибка: количества задач должны быть целыми числами (не строками, не NaN, не дробными)");
} else if (totalTasks < 0 || completedTasks < 0) {
  console.log("Ошибка: количество задач не может быть отрицательным");
} else if (totalTasks > MAX_TASKS) {
  console.log(`Ошибка: всего задач не может быть больше ${MAX_TASKS}`);
} else if (completedTasks > totalTasks) {
  console.log("Ошибка: выполнено больше задач, чем существует");
} else if (totalTasks === 0) {
  console.log("Задач пока нет");
} else {
  const remaining = totalTasks - completedTasks;
  const percent = (completedTasks / totalTasks) * 100;

  let status;
  if (completedTasks === 0) {
    status = "Не начато";
  } else if (completedTasks === totalTasks) {
    status = "Завершено";
  } else {
    status = "В работе";
  }

  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remaining}`);
  console.log(`Прогресс: ${percent.toFixed(1)}%`);
  console.log(`Статус: ${status}`);
}
