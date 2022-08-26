import "../scss/style.scss";
import Logo from "../img/favicon-32x32.png";

import changeFavicon from "./utils/changeFavicon";
import storageAvailable from "./localStorage/storageAvailable";
import toggleLightMode from "./localStorage/lightMode";
import initProjectArray from "./localStorage/initProjectArray";
import ProjectController from "./controllers/projectController";

(() => {
  // changeFavicon
  changeFavicon(Logo);

  // test localStorage availability
  const localStorageAvailable = storageAvailable("localStorage");

  if (localStorageAvailable === true) {
    // set lightMode
    toggleLightMode();
    // init projectArray
    initProjectArray();
    // projectController init 1 in lifetime page
    let name = window.prompt("Create Project...");
    let projectState = Object.assign({}, { name });
    const projectController = new ProjectController(projectState);
    projectController.create();
  } else {
    // log error in console && false silently with UI user
    console.log(localStorageAvailable);
  }
})();
