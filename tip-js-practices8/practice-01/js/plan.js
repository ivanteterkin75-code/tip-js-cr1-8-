"use strict";

// Данные варианта 8
const totalTasks = 14;
const completedTasks = 4;
const dailyLimit = 4;

const MAX_TASKS = 1000;
const MAX_LIMIT = 1000;

function isCount(value) {
  return typeof value === "number" && Number.isInteger(value);
}

let error = null;

if (!isCount(totalTasks) || !isCount(completedTasks)) {
  error = "количества задач должны быть целыми числами (не строками, не NaN, не дробными)";
} else if (totalTasks < 0 || completedTasks < 0) {
  error = "количество задач не может быть отрицательным";
} else if (totalTasks > MAX_TASKS) {
  error = `всего задач не может быть больше ${MAX_TASKS}`;
} else if (completedTasks > totalTasks) {
  error = "выполнено больше задач, чем существует";
} else if (!isCount(dailyLimit)) {
  error = "дневная норма должна быть целым числом (не строкой, не NaN, не дробной)";
} else if (dailyLimit < 1 || dailyLimit > MAX_LIMIT) {
  error = `дневная норма должна быть от 1 до ${MAX_LIMIT}`;
}

if (error !== null) {
  console.log(`Ошибка: ${error}`);
} else {
  let remaining = totalTasks - completedTasks;

  if (remaining === 0) {
    console.log("Все задачи уже выполнены");
    console.log("Потребуется дней: 0");
  } else {
    console.log(`Осталось задач: ${remaining}`);

    let day = 0;
    while (remaining > 0) {
      day += 1;
      const doneToday = Math.min(dailyLimit, remaining);
      remaining -= doneToday;
      console.log(`День ${day}: выполнено ${doneToday}, осталось ${remaining}`);
    }

    console.log(`Потребуется дней: ${day}`);
  }
}
