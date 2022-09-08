import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export default function toDo(options = {}) {
  const id = uuidv4();
  let title = options.title || "";
  let notes = options.notes || "";
  let isCompleted = false;
  let isImportant = false;
  let date = options.date || format(new Date(), "yyyy-MM-dd");

  const setIsCompleted = (bool) => {
    isCompleted = bool;
  };

  const setIsImportant = (bool) => {
    isImportant = bool;
  };

  // *Return getter make factory function reload new property if value change
  return {
    get id() {
      return id;
    },
    get title() {
      return title;
    },
    get notes() {
      return notes;
    },
    get isImportant() {
      return isImportant;
    },
    get date() {
      return date;
    },
    get isCompleted() {
      return isCompleted;
    },
    setIsCompleted,
    setIsImportant,
  };
}
