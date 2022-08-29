import { TOPICS } from "../enum/topics";
import { events } from "../utils/event";
import projectList from "../models/projectList";
import projectListView from "../views/projectListView";

export default (function projectListController() {
  //listen to project_added events
  events.on(TOPICS.PROJECT_ADDED, projectList.addProject);
  events.on(TOPICS.PROJECT_ADDED, projectListView.addProject);
  events.on(TOPICS.PROJECT_ADDED, projectListView.render);

  const add = (newProject) => {
    events.emit(TOPICS.PROJECT_ADDED, newProject);
  };

  return { add };
})();
