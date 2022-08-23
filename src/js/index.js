import "../scss/style.scss";
import Logo from "../img/favicon-32x32.png";

import changeFavicon from "./utils/changeFavicon";
import toggleLightMode from "./localStorage/lightMode";

(() => {
  // changeFavicon
  changeFavicon(Logo);
  // set lightMode
  toggleLightMode();
})();
