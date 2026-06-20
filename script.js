let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const category = document.getElementById("category").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    category,
    dueDate,
    done: false
  });

  document.getElementById("taskInput").value = "";
  save();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
}

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  save();
}

function editTask(id) {
  const newText = prompt("Edit task:");
  if (!newText) return;

  tasks = tasks.map(t =>
    t.id === id ? { ...t, text: newText } : t
  );
  save();
}

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-top">
        <span class="${task.done ? "done" : ""}" onclick="toggleTask(${task.id})">
          ${task.text}
        </span>

        <div>
          <button onclick="editTask(${task.id})">✏️</button>
          <button onclick="deleteTask(${task.id})">❌</button>
        </div>
      </div>

      <small>
        ${task.category} | Due: ${task.dueDate || "No date"}
      </small>
    `;

    list.appendChild(li);
  });
}

render();