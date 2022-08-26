import "../scss/style.scss";
import Logo from "../img/favicon-32x32.png";

import changeFavicon from "./utils/changeFavicon";
import storageAvailable from "./localStorage/storageAvailable";
import toggleLightMode from "./localStorage/lightMode";

(() => {
  // changeFavicon
  changeFavicon(Logo);

  // test localStorage availability
  const localStorageAvailable = storageAvailable("localStorage");

  if (localStorageAvailable === true) {
    // set lightMode
    toggleLightMode();
  } else {
    // log error in console && false silently with UI user
    console.log(localStorageAvailable);
  }
})();
