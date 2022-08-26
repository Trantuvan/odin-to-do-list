import Project from "../models/project.js";

export default class ProjectService {
  createProject(projectState) {
    const project = new Project(projectState);
    return project;
  }
}
