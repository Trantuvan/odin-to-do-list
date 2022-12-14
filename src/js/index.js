import "../scss/style.scss";
import Logo from "../img/favicon-32x32.png";

import changeFavicon from "./utils/changeFavicon";
import toggleLightMode from "./localStorage/lightMode";
import isEmptyOrSpaces from "./utils/isEmptyOrSpaces";
import project from "./models/project";
import localStorageController from "./localStorage/localStorageController";
import projectListController from "./controllers/projectListController";
import projectController from "./controllers/projectController";
import todo from "./models/todo";
import formView from "./views/formView";
import projectListView from "./views/projectListView";

(() => {
  // changeFavicon
  changeFavicon(Logo);

  // check localStorage availability for browser
  const localStorageAvailable =
    localStorageController.storageAvailable("localStorage");

  if (localStorageAvailable === true) {
    // set lightMode
    toggleLightMode();

    // initProjectArray in localStorage
    localStorageController.initProjectArray();

    // set projectArray from localStorage
    projectListController.setProjectListFromLocalStorage();
    // renderAllProjects when app load from localStorage
    projectListView.renderAllProjects();

    // app startup
    main();
  } else {
    // log error in console
    console.log(localStorageAvailable);
  }
})();

function main() {
  // window event create project when unfocused input
  const projectNameInput = document.getElementById("project-name");
  projectNameInput.addEventListener("blur", (evt) => {
    evt.preventDefault();
    createProject();
  });

  // window event create project when enter is pressed
  projectNameInput.addEventListener("keypress", (evt) => {
    const key = evt.key;

    if (key === "Enter") {
      evt.preventDefault();
      createProject();
    }
  });

  function createProject() {
    if (isEmptyOrSpaces(projectNameInput.value) === true) {
      return;
    }

    const newProject = project(projectNameInput.value);
    projectListController.add(newProject);

    // clear input value
    projectNameInput.value = "";
  }

  // ToDo
  const modal = document.querySelector(".modal");
  const modalContainer = document.querySelector(".modal-container");
  const addTaskbtn = document.querySelector("#add-task");
  const modalClosebtn = document.querySelector(".modal-header img");

  addTaskbtn.addEventListener("click", () => {
    modal.classList.toggle("deactivated");

    // render todoForm
    formView.renderCreateTodo();
    const modalSubmitButton = document.querySelector("#add-todo-submit");

    // list to create new todo
    modalSubmitButton.addEventListener("click", (evt) => {
      // prevent default prevent page to reload
      evt.preventDefault();
      evt.stopPropagation();

      const todoForm = document.querySelector(".todo");
      const formActionInputs = document.querySelectorAll(".form-action input");

      const inputArray = Array.from(formActionInputs).filter(
        (input) => input.type !== "submit"
      );

      // create new todo
      const newTodo = todo({
        title: inputArray[0].value,
        notes: inputArray[1].value,
        date: inputArray[2].value,
      });

      // add todo to project
      projectController.addTodo(newTodo);

      todoForm.reset();

      // close modal
      modal.classList.toggle("deactivated");
    });
  });

  // click outside modal will close the modal
  modal.addEventListener("click", () => {
    modal.classList.toggle("deactivated");
  });

  modalClosebtn.addEventListener("click", (evt) => {
    evt.stopPropagation();
    modal.classList.toggle("deactivated");
  });

  // prevent modal close when click in form
  modalContainer.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });
}
