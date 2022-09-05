import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export default function toDo(options = {}) {
  const id = uuidv4();
  const title = options.title || "";
  const notes = options.notes || "";
  const isCompleted = options.isCompleted || false;
  const isImportant = options.isImportant || false;
  const dueDate = options.dueDate || format(new Date(), "yyyy-MM-dd");

  return { id, title, notes, isImportant, dueDate, isCompleted, isImportant };
}
