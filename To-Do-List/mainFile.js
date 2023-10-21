const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTask");
let tasks = [];

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText === "") {
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(task);
  saveTasksToLocalStorage();
  displayTasks();
  newTaskInput.value = "";
}

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = task.completed ? "completed" : "";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteTask(task.id);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage();
  displayTasks();
}

function filterTasks(filterType) {
  let filteredTasks;

  switch (filterType) {
    case "all":
      filteredTasks = tasks;
      break;
    case "active":
      filteredTasks = tasks.filter((task) => !task.completed);
      break;
    case "completed":
      filteredTasks = tasks.filter((task) => task.completed);
      break;
  }

  displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(filteredTasks) {
  taskList.innerHTML = "";

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = task.completed ? "completed" : "";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteTask(task.id);
    };

    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed
      ? "Mark Incomplete"
      : "Mark Complete";
    completeButton.onclick = function () {
      toggleTaskCompletion(task.id);
    };

    li.appendChild(deleteButton);
    li.appendChild(completeButton);
    taskList.appendChild(li);
  });
}

function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasksToLocalStorage();
  displayTasks();
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasksData = localStorage.getItem("tasks");
  if (tasksData) {
    tasks = JSON.parse(tasksData);
  }
}

loadTasksFromLocalStorage();
displayTasks();
