const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// carrega ao abrir a página
document.addEventListener("DOMContentLoaded", loadTasks);

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        createTaskElement(task, index);
    });
}

// cria item visual da tarefa
function createTaskElement(task, index) {
    const li = document.createElement("li");

    li.innerHTML = `
    ${task}
    <button onclick="removeTask(${index})">X</button>
  `;

    taskList.appendChild(li);
}

function addTask() {
    const task = taskInput.value.trim();

    if (task === "") return;

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    taskInput.value = "";
    loadTasks();
}

function removeTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

function clearTasks() {
    localStorage.removeItem("tasks");
    loadTasks();
}