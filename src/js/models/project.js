import { v4 as uuidv4 } from "uuid";

export default function project(name) {
  const id = uuidv4();
  const todos = [];

  const setName = (value) => (name = value);

  return { id, name, todos, setName };
}
