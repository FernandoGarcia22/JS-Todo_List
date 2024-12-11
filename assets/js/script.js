let tareas = [
  { id: 1, tarea: "Hacer la cama", estado: false },
  { id: 2, tarea: "Sacar la basura", estado: false },
  { id: 3, tarea: "Hacer aseo", estado: false },
];

const entradaTarea = document.getElementById("taskInput");
const botonAgregarTarea = document.getElementById("addTaskButton");
const totalTareasElemento = document.getElementById("totalTasks");
const tareasCompletadasElemento = document.getElementById("completedTasks");
const listaTareasElemento = document.getElementById("taskList");

function actualizarConteoTareas() {
  const total = tareas.length;
  const completadas = tareas.filter((tarea) => tarea.estado).length;
  totalTareasElemento.innerHTML = total;
  tareasCompletadasElemento.innerHTML = completadas;
}

function renderizarTareas() {
  listaTareasElemento.innerHTML = "";
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
            <button class="delete-btn" data-id="${tarea.id}">Eliminar</button>
        `;

    listaTareasElemento.appendChild(itemTarea);
  }
  actualizarConteoTareas();
}

function agregarTarea() {
  const descripcionTarea = entradaTarea.value.trim();
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

botonAgregarTarea.addEventListener("click", agregarTarea);

listaTareasElemento.addEventListener("click", (evento) => {
  const idTarea = parseInt(evento.target.getAttribute("data-id"), 10);
  if (evento.target.classList.contains("statusCheckbox")) {
    cambiarEstadoTarea(idTarea);
  } else if (evento.target.classList.contains("delete-btn")) {
    eliminarTarea(idTarea);
  }
});

renderizarTareas();
