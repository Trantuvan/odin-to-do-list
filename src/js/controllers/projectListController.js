import projectList from "../models/projectList";
import projectListView from "../views/projectListView";
import todoListView from "../views/todoListView";
import projectController from "./projectController";
import localStorageController from "../localStorage/localStorageController";

export default (function projectListController() {
  const add = (newProject) => {
    projectList.addProject(newProject);
    projectListView.render(newProject);
    localStorageController.addProject(newProject);
  };

  const update = (id, name) => {
    projectList.updateProject(id, name);
    localStorageController.updateProjectName(id, name);
  };

  const remove = (id) => {
    projectController.removeAllToDos();
    todoListView.removeAllChildNodes();
    // setHeader name for todo
    const headerName = document.querySelector(".header__name");
    headerName.textContent = "no todo";
    projectList.removeProject(id);
  };

  const get = (id) => {
    return projectList.getProject(id);
  };

  const setProjectListFromLocalStorage = () => {
    const projectArray = localStorageController.projectArray;

    if (projectArray.length > 0) {
      projectList.setProjectsFromLocalStorage(projectArray);
    }
  };

  return { add, update, remove, get, setProjectListFromLocalStorage };
})();
