import ProjectService from "../services/projectService";
export default class ProjectController {
  constructor(state) {
    this.projectService = new ProjectService(state);
  }

  create() {
    const project = this.projectService.createProject();
    const projectArray = JSON.parse(localStorage.getItem("projectArray"));
    projectArray.push(project);
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  }
}
