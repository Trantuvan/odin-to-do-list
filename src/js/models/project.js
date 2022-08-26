export default class Project {
  constructor(state = {}) {
    this.name = state.name || "";
    this.todos = [];
  }
}
