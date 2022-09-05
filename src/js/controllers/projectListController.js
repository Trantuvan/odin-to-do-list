import projectList from "../models/projectList";
import projectListView from "../views/projectListView";

export default (function projectListController() {
  const add = (newProject) => {
    projectList.addProject(newProject);
    projectListView.render(newProject);
  };

  const update = (id, name) => {
    projectList.updateProject(id, name);
  };

  const remove = (id) => {
    projectList.removeProject(id);
  };

  const get = (id) => {
    return projectList.getProject(id);
  };

  return { add, update, remove, get };
})();
