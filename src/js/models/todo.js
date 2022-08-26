import { format } from "date-fns";

export default class ToDo {
  constructor(options = {}) {
    this.title = options.title || "";
    this.notes = options.notes || "";
    this.isCompleted = options.isCompleted || false;
    this.dueDate = options.dueDate || format(new Date(), "yyyy-MM-dd");
  }
}
