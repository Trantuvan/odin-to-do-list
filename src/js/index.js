import "../scss/style.scss";
import Logo from "../img/favicon-32x32.png";

import changeFavicon from "./utils/changeFavicon";
import toggleLightMode from "./localStorage/lightMode";
import isEmptyOrSpaces from "./utils/isEmptyOrSpaces";
import project from "./models/project";
import projectListController from "./controllers/projectListController";

(() => {
  // changeFavicon
  changeFavicon(Logo);
  // set lightMode
  toggleLightMode();

  // app startup
  main();
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
}
