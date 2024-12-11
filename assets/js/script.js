let tareas = [
  { id: 1, tarea: "Hacer la cama", estado: false },
  { id: 2, tarea: "Sacar la basura", estado: false },
  { id: 3, tarea: "Hacer aseo", estado: false },
];

const taskInput = document.querySelector("#taskInput");
const btnAddTask = document.querySelector("#addTask");
const taskTotal = document.querySelector("#taskTotal");
const taskCompleted = document.querySelector("#taskCompleted");
const taskList = document.querySelector("#taskList");

function actualizarConteoTareas() {
  const total = tareas.length;
  const completadas = tareas.filter((tarea) => tarea.estado).length;
  taskTotal.innerHTML = total;
  taskCompleted.textContent = completadas;
}

function renderizarTareas() {
  taskList.innerHTML = "";
  for (let tarea of tareas) {
    const itemTarea = document.createElement("div");
    itemTarea.classList.add("task-item");
    itemTarea.innerHTML = `
            <span class="${tarea.estado ? "completed" : ""}">${tarea.id}. ${
      tarea.tarea
    }</span>
            <input type="checkbox" class="statusCheckbox" ${
              tarea.estado ? "checked" : ""
            } data-id="${tarea.id}">
            <button class="deleteBtn" data-id="${tarea.id}">Eliminar</button>
        `;

    taskList.appendChild(itemTarea);
  }
  actualizarConteoTareas();
}

function agregarTarea() {
  const descripcionTarea = taskInput.value.trim();
  if (descripcionTarea !== "") {
    const nuevaTarea = {
      id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
      tarea: descripcionTarea,
      estado: false,
    };
    tareas.push(nuevaTarea);
    entradaTarea.value = "";
    renderizarTareas();
  }
}

function eliminarTarea(id) {
  const indiceDeTareaAEliminar = tareas.findIndex((tarea) => tarea.id === id);
  if (indiceDeTareaAEliminar !== -1) {
    tareas.splice(indiceDeTareaAEliminar, 1);
    renderizarTareas();
  }
}

function cambiarEstadoTarea(id) {
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (tarea) {
    tarea.estado = !tarea.estado;
    renderizarTareas();
  }
}

btnAddTask.addEventListener("click", agregarTarea);

taskList.addEventListener("click", (evento) => {
  const idTarea = parseInt(evento.target.getAttribute("data-id"), 10);
  if (evento.target.classList.contains("statusCheckbox")) {
    cambiarEstadoTarea(idTarea);
  } else if (evento.target.classList.contains("delete-btn")) {
    eliminarTarea(idTarea);
  }
});

renderizarTareas();
