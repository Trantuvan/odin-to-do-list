import "../scss/style.scss";
import Logo from "../img/favicon-32x32.png";

import changeFavicon from "./utils/changeFavicon";
import storageAvailable from "./localStorage/storageAvailable";
import toggleLightMode from "./localStorage/lightMode";
import initProjectArray from "./localStorage/initProjectArray";
import State from "./utils/state";
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
    // start app
    main();
  } else {
    // log error in console && false silently with UI user
    console.log(localStorageAvailable);
  }
})();

function main() {
  const projectState = new State();
  const projectController = new ProjectController();
}
