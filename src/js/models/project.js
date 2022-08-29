export default function project(name) {
  const todos = [];

  const setName = (value) => (name = value);

  return { name, todos, setName };
}
