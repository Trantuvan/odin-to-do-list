import todoListView from "../views/todoListView";

export default (function projectController() {
  let project = {};

  const setProject = (value) => {
    project = value;
  };

  const getAllTodos = () => {
    const todos = project.todos;
    todoListView.renderAlltodos(todos);
  };

  const addTodo = (newTodo) => {
    try {
      project.todos.push(newTodo);
      todoListView.renderTodo(newTodo);
    } catch (e) {
      todoListView.renderWhenNoProject();
    }
  };

  return { setProject, addTodo, getAllTodos };
})();
