import projectList from "../models/projectList";
import projectListView from "../views/projectListView";
import todoListView from "../views/todoListView";
import projectController from "./projectController";

export default (function projectListController() {
  const add = (newProject) => {
    projectList.addProject(newProject);
    projectListView.render(newProject);
  };

  const update = (id, name) => {
    projectList.updateProject(id, name);
  };

  const remove = (id) => {
    projectController.removeAllToDos();
    todoListView.removeAllChildNodes();
    projectList.removeProject(id);
  };

  const get = (id) => {
    return projectList.getProject(id);
  };

  return { add, update, remove, get };
})();
