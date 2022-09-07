import { v4 as uuidv4 } from "uuid";

export default function project(name = "") {
  const id = uuidv4();
  const todos = [];

  const setName = (value) => (name = value);

  // *Return getter make factory function reload new property if value change
  return {
    get id() {
      return id;
    },
    get name() {
      return name;
    },
    get todos() {
      return todos;
    },
    setName,
  };
}
