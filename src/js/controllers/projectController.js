import ProjectService from "../services/projectService";

export default class ProjectController {
  constructor() {
    this.projectService = new ProjectService();
  }

  create(projectState) {
    const project = this.projectService.createProject(projectState);
    const projectArray = JSON.parse(localStorage.getItem("projectArray"));
    projectArray.push(project);
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  }
}
