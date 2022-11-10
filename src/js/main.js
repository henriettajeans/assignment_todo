/** @format */

import { Todos } from "./models/object";

// hämtar DOM
let container = document.querySelector(".container");
let myList = document.querySelector(".container__list");
let sectionForm = document.querySelector(".form-container");

// min arrayList början tomt
const myArray = [];

// skaper min form
const form = document.createElement("form");
sectionForm.appendChild(form);
form.classList.add("form-container__form");
const input = document.createElement("input");
form.appendChild(input);
input.classList.add("form-container__form__input");
input.type = "text";
input.name = "task-Input";
input.placeholder = "Add a task";
const addButton = document.createElement("button");
addButton.classList.add("form-container__addBtn");
addButton.innerText = "Add to list";
sectionForm.appendChild(addButton);

// skapar tager och lopper min array lista
function displayHTML() {
  // det ska inde dubblikeras
  myList.innerHTML = "";
  for (let i = 0; i < myArray.length; i++) {
    let todo = document.createElement("div"); // skapar en div

    todo.classList.add("container__list__todo"); // class name
    myList.appendChild(todo);

    let item = document.createElement("li");
    item.innerText = myArray[i].todoTask; // gör synligt mina input och visar i skärmen
    item.classList.add("container__list__todo__item");
    todo.appendChild(item);

    completedButton = document.createElement("button"); // ska kunna markera mina todo när de är utfärdade
    completedButton.innerHTML = "✅";
    completedButton.classList.add("container__list__todo__item__completedBtn");
    todo.appendChild(completedButton);
    // completedButton.addEventListener("click", completeTodo);

    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑";
    deleteButton.classList.add("container__list__todo__item__deleteBtn"); // ska kunna ta bort en todo i min array lista
    todo.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      myArray.splice([i], 1);
      saveTolocalStorage();
      displayHTML();
    });
  }
}

// skapar en fukntion för att kunna skapas en todo
function addTodoList(event) {
  event.preventDefault();
  let myAddedTask = new Todos(input.value); // förhindrar att lägga någon tomt input i min lista

  if (input.value === "") {
    alert("Plase add task");
    return false;
  } else {
    myArray.push(myAddedTask); // lägger i min lista
    saveTolocalStorage(); //sparar till local storage med hjälp av funktionen nedan
    displayHTML(); // hämtar mina tager och skapar nya tager för varje todo
    // tomma inputet för varje input
    input.value = "";
  }
}
// kopplar add todo i add knappen
addButton.addEventListener("click", addTodoList);

// få listan from local Storage
function getTodoFromLocalStorage() {
  myArray = JSON.parse(localStorage.getItem("myArray"));
  saveTolocalStorage();
  displayHTML();
}

document.addEventListener("load", getTodoFromLocalStorage);

// sparar i local Stora
function saveTolocalStorage() {
  let mylS = JSON.stringify(myArray);
  localStorage.setItem("myArray", mylS);
}
// }

function completeTodo(e) {
  let myDoneTask = e.target;
  if (myDoneTask.classList[0] === "container__list__todo__item__completedBtn") {
    let todo = myDoneTask.parentElement;
    todo.classList.toggle("completed");
  }
}

myList.addEventListener("click", completeTodo);
