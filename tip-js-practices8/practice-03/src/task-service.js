// Прикладные функции работы с задачами.
// Все функции чистые: не печатают в консоль, не читают внешнее состояние
// и не изменяют переданные массивы и объекты.
// Для предусмотренных ошибок возвращается { ok: false, error: "..." }.

const PRIORITIES = ["low", "medium", "high"];
const MAX_TITLE_LENGTH = 100;

// ---------- внутренние функции проверки ----------

function fail(error) {
  return { ok: false, error };
}

function isValidId(id) {
  return typeof id === "number" && Number.isSafeInteger(id) && id > 0;
}

// Возвращает { ok: true, title } с очищенным названием либо { ok: false, error }.
function normalizeTitle(title) {
  if (typeof title !== "string") {
    return fail("Название должно быть строкой");
  }
  const trimmed = title.trim();
  if (trimmed.length < 1) {
    return fail("Название не может быть пустым");
  }
  if (trimmed.length > MAX_TITLE_LENGTH) {
    return fail(`Название не может быть длиннее ${MAX_TITLE_LENGTH} символов`);
  }
  return { ok: true, title: trimmed };
}

function checkId(id) {
  return isValidId(id)
    ? { ok: true }
    : fail("Идентификатор должен быть положительным безопасным целым числом");
}

// ---------- создание ----------

export function createTask(id, title, priority = "medium") {
  const idCheck = checkId(id);
  if (!idCheck.ok) {
    return idCheck;
  }

  const titleCheck = normalizeTitle(title);
  if (!titleCheck.ok) {
    return titleCheck;
  }

  if (typeof priority !== "string" || !PRIORITIES.includes(priority)) {
    return fail('Приоритет должен быть одним из значений: "low", "medium", "high"');
  }

  return {
    ok: true,
    task: { id, title: titleCheck.title, completed: false, priority },
  };
}

// ---------- чтение ----------

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  let completed = 0;
  for (const task of tasks) {
    if (task.completed === true) {
      completed += 1;
    }
  }
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  return { total, completed, pending, progress };
}

// ---------- изменение (без мутации входных данных) ----------

export function addTask(tasks, id, title, priority = "medium") {
  const created = createTask(id, title, priority);
  if (!created.ok) {
    return created;
  }
  if (findTaskById(tasks, id) !== undefined) {
    return fail(`Задача с id = ${id} уже существует`);
  }
  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  const idCheck = checkId(id);
  if (!idCheck.ok) {
    return idCheck;
  }
  if (typeof completed !== "boolean") {
    return fail("Статус выполнения должен быть значением true или false");
  }
  if (findTaskById(tasks, id) === undefined) {
    return fail(`Задача с id = ${id} не найдена`);
  }
  return {
    ok: true,
    tasks: tasks.map((task) => (task.id === id ? { ...task, completed } : task)),
  };
}

export function renameTask(tasks, id, title) {
  const idCheck = checkId(id);
  if (!idCheck.ok) {
    return idCheck;
  }
  const titleCheck = normalizeTitle(title);
  if (!titleCheck.ok) {
    return titleCheck;
  }
  if (findTaskById(tasks, id) === undefined) {
    return fail(`Задача с id = ${id} не найдена`);
  }
  return {
    ok: true,
    tasks: tasks.map((task) =>
      task.id === id ? { ...task, title: titleCheck.title } : task,
    ),
  };
}

export function removeTask(tasks, id) {
  const idCheck = checkId(id);
  if (!idCheck.ok) {
    return idCheck;
  }
  if (findTaskById(tasks, id) === undefined) {
    return fail(`Задача с id = ${id} не найдена`);
  }
  return { ok: true, tasks: tasks.filter((task) => task.id !== id) };
}
