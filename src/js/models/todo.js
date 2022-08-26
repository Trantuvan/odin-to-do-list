import { format } from "date-fns";

export default class ToDo {
  constructor(state = {}) {
    this.title = state.title || "";
    this.notes = state.notes || "";
    this.isCompleted = state.isCompleted || false;
    this.dueDate = state.dueDate || format(new Date(), "yyyy-MM-dd");
  }
}
