export default function project() {
  let name = "";
  const todos = [];

  const setName = (value) => (name = value);

  return { name, todos, setName };
}
