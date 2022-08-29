import { TOPICS } from "../enum/topics";
import { events } from "../utils/event";
import projectList from "../models/projectList";
import projectListView from "../views/projectListView";

export default (function projectListController() {
  // add project to projectList array
  events.on(TOPICS.PROJECT_ADDED, projectList.addProject);
  // add project to projectListView array
  events.on(TOPICS.PROJECT_ADDED, projectListView.addProject);
  // render last project in projectListView array
  events.on(TOPICS.PROJECT_ADDED, projectListView.render);

  const add = (newProject) => {
    events.emit(TOPICS.PROJECT_ADDED, newProject);
  };

  return { add };
})();
