//Initialize DOM elemets.
const componentDOM = document.querySelector(".component");
const dayOfWeekDOM = document.querySelector(".dayOfWeek");
const dateDOM = document.querySelector(".date");
const btnAddTaskDOM = document.querySelector("#addTaskBtn");
const btnDiscardDOM = document.querySelector(".btn-discard");
const btnInsertTaskDOM = document.querySelector(".btn-add");
const modalDOM = document.querySelector(".modal");
const modalDOMInside = document.querySelector(".modal .add-task");
const todosDOM = document.querySelector(".todos");
const taskInputDOM = document.querySelector(".task-input");

//Add EventListeners to button elements and call functions.
btnAddTaskDOM.addEventListener("click", addModal);
btnDiscardDOM.addEventListener("click", discardModal);
btnInsertTaskDOM.addEventListener("click", addTask);
window.addEventListener("keyup", (e) => {
  if (e.which === 13) addTask();
});

let tasks = getLocalStorage()
  ? //Check whether local storage is set beforehand or not. If it's not set, then assign the default example data to tasks variable.
    getLocalStorage()
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

setLocalStorage(); //Stores "tasks" list in local storage.

//Call functions to display data at startup.
setDate();
displayTasks();

//Set current day and current date for the top section of component.
function setDate() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();
  let day = date.getDate();
  let year = date.getFullYear();
  let month = monthNames[date.getMonth()];

  dateDOM.innerHTML = `${month} ${day}, ${year}`;

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

//Set tasks array data into the local storage.
function setLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Get tasks array data from the local storage.
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks"));
}

//Add task to the local storage.
function addTask() {
  tasks = getLocalStorage();
  let taskName = taskInputDOM.value;
  if (taskName) {
    tasks.push({
      id: tasks.lenght > -1 ? tasks.at(-1).id + 1 : 1,
      //Control if there is an element in the tasks array. if there is, assign the new task's id the last task's id + 1. In this case, ids will be assigned as ordered.
      name: taskName,
      isDone: false,
    });
    setLocalStorage();
    displayTasks();
    discardModal();
    taskInputDOM.value = "";
  } else {
    modalDOMInside.appendChild(addAlert("Task can't be empty."));
  }
}

function addAlert(text) {
  let alert = document.createElement("p");
  alert.style.margin = ".5rem";
  alert.style.color = "red";
  alert.style.fontSize = ".8rem";
  alert.textContent = text;
  setTimeout(() => {
    alert.remove();
  }, 1500);
  return alert;
}

//Removes task
function taskRemove(index) {
  tasks = getLocalStorage();
  tasks.splice(index, 1);
  setLocalStorage();
  displayTasks();
}

//Toggles task's isDone property according to its index.
function toggleTaskDone(index) {
  tasks = getLocalStorage();
  !tasks[index].isDone
    ? (tasks[index].isDone = true)
    : (tasks[index].isDone = false);
  setLocalStorage();
  displayTasks();
}

//Display tasks that comes from local storage.
function displayTasks() {
  tasks = getLocalStorage();
  todosDOM.innerHTML = "";
  if (tasks[0] != undefined) {
    tasks.forEach((task, index) => {
      let doneIcon = document.createElement("div");
      doneIcon.classList.add("task-done");
      doneIcon.setAttribute("onclick", `toggleTaskDone(${index});`);
      let liDOM = document.createElement("li");
      liDOM.classList.add("task");
      task.isDone ? liDOM.classList.add("done") : null; //make the task done
      let removeIconDOM = document.createElement("span");
      removeIconDOM.classList.add("task-delete");
      removeIconDOM.addEventListener("click", () => {
        taskRemove(index);
      });
      liDOM.appendChild(doneIcon);
      liDOM.innerHTML += task.name;
      liDOM.appendChild(removeIconDOM);
      todosDOM.appendChild(liDOM);
    });
  } else {
    let p = document.createElement("p");
    p.style.textAlign = "center";
    p.style.marginBottom = "1rem";
    p.textContent = "No task yet.";
    todosDOM.appendChild(p);
  }
}

//Make the modal element visible on the screen.
function addModal() {
  modalDOM.style.display = "flex";
}

//Make the modal element visible on the screen.
function discardModal() {
  modalDOM.style.display = "none";
}
