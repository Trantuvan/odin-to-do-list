export default class Project {
  constructor(options = {}) {
    this.name = options.name || "";
    this.todos = [];
  }
}
