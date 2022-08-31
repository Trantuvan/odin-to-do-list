export default (function projectListView() {
  const projects = [];

  const addProject = (newProject) => projects.push(newProject);

  const render = () => {
    const navList = document.querySelector(".nav__list");
    const navItem = document.createElement("li");
    navItem.setAttribute("class", "nav__item");

    navItem.innerHTML = `
      <input
        class="item__content"
        type="text"
        name="projectName"
        placeholder="${projects.at(-1).name}"
        disabled
        />
        <i class="fa-solid fa-ellipsis-vertical"></i>
      <div class="item__actions">
        <button type="button" class="btn btn-edit">edit</button>
        <button type="button" class="btn btn-delete">delete</button>
      </div>
    `;

    navList.appendChild(navItem);

    const ellipsis = navItem.querySelector("i");

    ellipsis.addEventListener("click", (evt) => {
      evt.stopPropagation();
      const itemActions = navItem.querySelector(".item__actions");
      itemActions.classList.toggle("display-flex");
    });

    window.addEventListener("click", () => {
      const itemActions = navItem.querySelector(".item__actions");
      itemActions.classList.remove("display-flex");
    });

    const actionButtons = navItem.querySelector(".item__actions").children;

    Array.from(actionButtons).forEach((element) => {
      const classList = element.classList;

      if (classList.contains("btn-edit")) {
        element.addEventListener("click", (evt) => {
          const projectName = document.querySelector(".item__content");
          projectName.disabled = false;
          projectName.focus();
        });
      }

      if (classList.contains("btn-delete")) {
        console.log(element);
      }
    });
  };

  return { addProject, render };
})();
