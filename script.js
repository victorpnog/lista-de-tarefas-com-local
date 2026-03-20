const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// quando abre a página, tenta puxar o que já tava salvo
document.addEventListener("DOMContentLoaded", loadTasks);

function getTasks() {
    // pega do localStorage ou retorna vazio se não tiver nada
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    // salva tudo de novo já atualizado
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();

    // limpa a lista antes de redesenhar
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // estrutura simples: texto + botão de remover
        li.innerHTML = `
      ${task}
      <button onclick="removeTask(${index})">X</button>
    `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const task = taskInput.value.trim();

    // evita adicionar coisa vazia (recomendado pela ia)
    if (!task) return;

    const tasks = getTasks();
    tasks.push(task);

    saveTasks(tasks);

    // limpa o input pra próxima
    taskInput.value = "";
    loadTasks();
}

function removeTask(index) {
    const tasks = getTasks();

    // remove exatamente o item clicado
    tasks.splice(index, 1);

    saveTasks(tasks);
    loadTasks();
}

function clearTasks() {
    // apaga tudo sem dó
    localStorage.removeItem("tasks");
    loadTasks();
}