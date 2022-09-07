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

  const updateTodoCompleted = (id, bool) => {
    const currentTodo = project.todos.find((todo) => todo.id === id);
    currentTodo.setIsCompleted(bool);
  };

  const removeAllToDos = () => {
    project.todos.splice(0, project.todos.length);
  };

  return {
    setProject,
    addTodo,
    getAllTodos,
    removeAllToDos,
    updateTodoCompleted,
  };
})();
