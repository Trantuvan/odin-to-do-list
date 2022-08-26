import Project from "../models/project.js";

export default class ProjectService {
  constructor(state) {
    this.state = state;
  }

  createProject() {
    const project = new Project(this.state);
    return project;
  }
}
