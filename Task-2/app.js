//Initialize DOM elemets.
const componentDOM = document.querySelector(".component");
const dayOfWeekDOM = document.querySelector(".dayOfWeek");
const btnAddTaskDOM = document.querySelector("#addTaskBtn");
const btnDiscardDOM = document.querySelector(".btn-discard");
const btnInsertTaskDOM = document.querySelector(".btn-add");
const modalDOM = document.querySelector(".modal");
const todosDOM = document.querySelector(".todos");
const taskInputDOM = document.querySelector(".task-input");

//Add EventListeners to button elements and call functions.
btnAddTaskDOM.addEventListener("click", addModal);
btnDiscardDOM.addEventListener("click", discardModal);
btnInsertTaskDOM.addEventListener("click", addTask);

let tasks = JSON.parse(localStorage.getItem("tasks"))
  ? //Check whether local storage is set beforehand or not. If it's not set, then assign the default example data to tasks variable.
    JSON.parse(localStorage.getItem("tasks"))
  : [
      {
        id: 1,
        name: "Go Jim!",
        isDone: false,
      },
      {
        id: 2,
        name: "Read a Book.",
        isDone: false,
      },
      {
        id: 3,
        name: "Make a To-do App",
        isDone: true,
      },
      {
        id: 4,
        name: "Get the certificate of JS",
        isDone: false,
      },
    ];

localStorage.setItem("tasks", JSON.stringify(tasks)); //Stores "tasks" list in local storage.

//Call functions to display data at startup.
setDay();
displayTasks();

//Set current day and current date for the top section of component.
function setDay() {
  let date = new Date();

  //Controls index of days. [0=> Sunday, ..., 6=> Saturday]
  date.getDay() === 0
    ? (dayOfWeekDOM.innerHTML = "Sunday")
    : date.getDay() === 1
    ? (dayOfWeekDOM.innerHTML = "Monday")
    : date.getDay() === 2
    ? (dayOfWeekDOM.innerHTML = "Tuesday")
    : date.getDay() === 3
    ? (dayOfWeekDOM.innerHTML = "Wednesday")
    : date.getDay() === 4
    ? (dayOfWeekDOM.innerHTML = "Thursday")
    : date.getDay() === 5
    ? (dayOfWeekDOM.innerHTML = "Friday")
    : date.getDay() === 6
    ? (dayOfWeekDOM.innerHTML = "Saturday")
    : (dayOfWeekDOM.innerHTML = "-");
}

//Display tasks that comes from local storage.
function displayTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  todosDOM.innerHTML = "";
  tasks.forEach((task, index) => {
    let liDOM = document.createElement("li");
    liDOM.classList.add("task");
    task.isDone ? liDOM.classList.add("done") : null; //make the task done
    let removeIconDOM = document.createElement("span");
    removeIconDOM.classList.add("task-delete");
    removeIconDOM.addEventListener("click", () => {
      taskRemove(task);
    });
    liDOM.textContent = task.name;
    liDOM.addEventListener("click", () => {
      toggleTaskDone(index);
    });
    liDOM.appendChild(removeIconDOM);
    todosDOM.appendChild(liDOM);
  });
}

//Removes task
function taskRemove(task) {
  const filteredItems = tasks.filter((item) => item !== task);
  tasks = filteredItems;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

//Toggles task's isDone property according to its index.
function toggleTaskDone(index) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  !tasks[index].isDone
    ? (tasks[index].isDone = true)
    : (tasks[index].isDone = false);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

//Make the modal element visible on the screen.
function addModal() {
  modalDOM.style.display = "flex";
}

//Make the modal element visible on the screen.
function discardModal() {
  modalDOM.style.display = "none";
}

//Add task to the local storage.
function addTask() {
  let taskName = taskInputDOM.value;
  tasks.push({ id: tasks.length + 1, name: taskName, isDone: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
  discardModal();
  taskInputDOM.value = "";
}
