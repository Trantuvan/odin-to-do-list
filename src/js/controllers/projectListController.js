import projectList from "../models/projectList";
import projectListView from "../views/projectListView";

export default (function projectListController() {
  const add = (newProject) => {
    projectList.addProject(newProject);
    projectListView.renderAddProject(newProject);
  };

  const get = (id) => {};

  return { add, get };
})();
