//Initializing DOM elements.
const tagUser = document.querySelector("#user");
const tagNow = document.querySelector("#now");
const tagDay = document.querySelector("#dayOfDate");

//Getting a name as an input from the user.
const NAME = prompt("What's your name?");
tagUser.innerHTML = NAME;

//Calling functions when DOM is loaded.
setTime();
setDay();

//Updating time and day each second (1sec = 1000ms).
setInterval(() => {
  setTime();
  setDay();
}, 1000);

//Setting time function.
function setTime() {
  let date = new Date();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  let timeString = `${h}:${m}:${s}`;
  tagNow.innerHTML = timeString;
}

//Setting day-of-the-week function.
function setDay() {
  let date = new Date();

  //Controls index of days. [0=> Sunday, ..., 6=> Saturday]
  date.getDay() === 0
    ? (tagDay.innerHTML = "Sunday")
    : date.getDay() === 1
    ? (tagDay.innerHTML = "Monday")
    : date.getDay() === 2
    ? (tagDay.innerHTML = "Tuesday")
    : date.getDay() === 3
    ? (tagDay.innerHTML = "Wednesday")
    : date.getDay() === 4
    ? (tagDay.innerHTML = "Thursday")
    : date.getDay() === 5
    ? (tagDay.innerHTML = "Friday")
    : date.getDay() === 6
    ? (tagDay.innerHTML = "Saturday")
    : (tagDay.innerHTML = "-");
}
