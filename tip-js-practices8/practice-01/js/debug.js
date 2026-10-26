"use strict";

// ИСПРАВЛЕННАЯ версия. Исходные ошибки:
//   1) completedText + additionalText — конкатенация строк ("3" + "2" = "32");
//   2) цикл `taskNumber < 4` не включал число 4.

const plannedText = "8";
const completedText = "3";
const additionalText = "2";

const completedTotal = Number(completedText) + Number(additionalText);
const remainingTasks = Number(plannedText) - completedTotal;

console.log("Выполнено:", completedTotal);
console.log("Осталось:", remainingTasks);

let controlSum = 0;

for (let taskNumber = 1; taskNumber <= 4; taskNumber += 1) {
  controlSum += taskNumber;
}

console.log("Контрольная сумма:", controlSum);
