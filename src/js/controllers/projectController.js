export default (function projectController() {
  let project = {};

  const setProject = (value) => {
    project = value;
    console.log(project);
  };

  const addTodo = (newTodo) => {
    project.todos.push(newTodo);
    console.log("projectController", newTodo);
    console.log("projectController", project);
  };

  return { setProject, addTodo };
})();
