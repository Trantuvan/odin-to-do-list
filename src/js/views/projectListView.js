import projectListController from "../controllers/projectListController";
import isEmptyOrSpaces from "../utils/isEmptyOrSpaces";
import projectController from "../controllers/projectController";
import localStorageController from "../localStorage/localStorageController";

export default (function projectListView() {
  const renderAllProjects = () => {
    const projectsFromLocalStorage = localStorageController.projectArray;

    if (projectsFromLocalStorage.length > 0) {
      projectsFromLocalStorage.forEach((project) => render(project));
    }
  };

  const render = (project) => {
    const navList = document.querySelector(".nav__list");
    const navItem = document.createElement("li");
    navItem.setAttribute("class", "nav__item");

    navItem.innerHTML = `
      <input
        class="item__content"
        type="text"
        name="projectName"
        placeholder="${project.name}"
        data-id = "${project.id}"
        disabled
        />
        <i class="fa-solid fa-ellipsis-vertical"></i>
      <div class="item__actions">
        <button type="button" class="btn btn-edit">edit</button>
        <button type="button" class="btn btn-delete">delete</button>
      </div>
    `;

    navList.appendChild(navItem);

    listViewDomEvents(navItem);
  };

  const listViewDomEvents = (navItem) => {
    // get project when click
    navItem.addEventListener("click", (evt) => {
      evt.stopPropagation();

      // get project
      const currentProjectId = navItem
        .querySelector(".item__content")
        .getAttribute("data-id");
      const currentProject = projectListController.get(currentProjectId);

      // setHeader name for todo
      const headerName = document.querySelector(".header__name");
      headerName.textContent = currentProject.name;
      projectController.setProject(currentProject);

      // render all todos already have
      projectController.getAllTodos();
    });
    // toggle action Menu
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

    // add EventListener for edit / delete actions
    const actionButtons = navItem.querySelector(".item__actions").children;

    Array.from(actionButtons).forEach((element) => {
      const classList = element.classList;

      if (classList.contains("btn-edit")) {
        element.addEventListener("click", (evt) => {
          evt.stopPropagation();
          const projectName =
            evt.target.parentNode.parentNode.querySelector(".item__content");

          projectName.disabled = false;
          projectName.focus();

          // change project name
          projectName.addEventListener("blur", (evt) => {
            evt.preventDefault();
            updateProject(evt);
          });

          // window event create project when enter is pressed
          projectName.addEventListener("keypress", (evt) => {
            const key = evt.key;

            if (key === "Enter") {
              evt.preventDefault();
              updateProject(evt);
            }
          });

          function updateProject(evt) {
            const currentProject = evt.target;
            if (isEmptyOrSpaces(evt.target.value) === true) {
              return;
            }

            projectListController.update(
              currentProject.getAttribute("data-id"),
              currentProject.value
            );
            currentProject.disabled = true;
          }
        });
      }

      if (classList.contains("btn-delete")) {
        element.addEventListener("click", (evt) => {
          evt.stopPropagation();
          const projectName =
            evt.target.parentNode.parentNode.querySelector(".item__content");

          // delete project in projectList
          deleteProject(projectName.getAttribute("data-id"));

          const navList = navItem.parentNode;
          navList.removeChild(navItem);
        });

        function deleteProject(currentId) {
          projectListController.remove(currentId);
        }
      }
    });
  };

  return { render, renderAllProjects };
})();
