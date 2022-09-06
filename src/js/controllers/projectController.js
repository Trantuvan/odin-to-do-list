import todoListView from "../views/todoListView";

export default (function projectController() {
  let project = {};

  const setProject = (value) => {
    project = value;
    console.log(project);
  };

  const getAllTodos = () => {
    const todos = project.todos;
    todoListView.renderAlltodos(todos);
  };

  const addTodo = (newTodo) => {
    project.todos.push(newTodo);
    console.log("projectController", newTodo);
    console.log("projectController", project);
    todoListView.renderTodo(newTodo);
  };

  return { setProject, addTodo, getAllTodos };
})();
