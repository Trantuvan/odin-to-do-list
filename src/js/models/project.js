import { v4 as uuidv4 } from "uuid";

export default function project(name = "") {
  let id = uuidv4();
  let todos = [];

  const setName = (value) => (name = value);

  // *Return getter make factory function reload new property if value change
  return {
    get id() {
      return id;
    },
    set id(newid) {
      id = newid;
    },
    get name() {
      return name;
    },
    set name(newname) {
      name = newname;
    },
    get todos() {
      return todos;
    },
    set todos(newtodos) {
      todos = newtodos;
    },
    setName,
  };
}
