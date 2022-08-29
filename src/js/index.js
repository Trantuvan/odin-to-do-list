import "../scss/style.scss";
import Logo from "../img/favicon-32x32.png";

import changeFavicon from "./utils/changeFavicon";
import toggleLightMode from "./localStorage/lightMode";
import { TOPICS } from "./enum/topics";
import { events } from "./utils/event";
import project from "./models/project";
import projectListController from "./controllers/projectListController";

(() => {
  // changeFavicon
  changeFavicon(Logo);
  // set lightMode
  toggleLightMode();

  // listen to project create events
  events.on(TOPICS.PROJECT_CREATED, projectListController.add);

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
    if (projectNameInput.value === "") {
      return;
    }

    const newProject = project(projectNameInput.value);
    events.emit(TOPICS.PROJECT_CREATED, newProject);

    // clear input value
    projectNameInput.value = "";
  }
}
