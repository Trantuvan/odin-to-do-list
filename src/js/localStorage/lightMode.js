import sunIcon from "../../img/icon-sun.svg";
import moonIcon from "../../img/icon-moon.svg";

export default function toggleLightMode() {
  let lightMode = localStorage.getItem("lightMode");
  const lightModeToggle = document.querySelector("#light-mode-toggle");
  const iconToggle = lightModeToggle.querySelector("img");

  const enableLightMode = () => {
    document.body.classList.add("light-mode");
    iconToggle.src = moonIcon;
    iconToggle.alt = "dark mode";

    localStorage.setItem("lightMode", JSON.stringify(true));
  };

  const disableLightMode = () => {
    document.body.classList.remove("light-mode");
    iconToggle.src = sunIcon;
    iconToggle.alt = "light mode";

    localStorage.setItem("lightMode", JSON.stringify(false));
  };

  if (JSON.parse(lightMode) === true) {
    enableLightMode();
  }

  lightModeToggle.addEventListener("click", () => {
    lightMode = localStorage.getItem("lightMode");

    if (JSON.parse(lightMode) === false) {
      enableLightMode();
    } else {
      disableLightMode();
    }
  });
}
