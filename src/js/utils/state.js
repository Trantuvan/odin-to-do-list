export default class State {
  constructor(state = {}) {
    this.state = state;
  }

  setState(nameProp, value) {
    this.state[nameProp] = value;
  }

  getState() {
    return this.state;
  }
}
