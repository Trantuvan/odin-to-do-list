import localStorageController from "../localStorage/localStorageController";
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
      localStorageController.addTodo(newTodo);
      todoListView.renderTodo(newTodo);
    } catch (e) {
      todoListView.renderWhenNoProject();
    }
  };

  const updateTodoCompleted = (id, bool) => {
    const currentTodo = project.todos.find((todo) => todo.id === id);
    currentTodo.setIsCompleted(bool);
    localStorageController.updateComplete(id, bool, project);
  };

  const updateTodoImportant = (id, bool) => {
    const currentTodo = project.todos.find((todo) => todo.id === id);
    currentTodo.setIsImportant(bool);
  };

  const updateTodo = (id, ...args) => {
    const currentTodo = project.todos.find((todo) => todo.id === id);
    currentTodo.setTitle(args[0]);
    currentTodo.setNotes(args[1]);
    currentTodo.setDate(args[2]);
    todoListView.renderUpdate(id, currentTodo);
  };

  const removeTodo = (id) => {
    const currentIndex = project.todos.findIndex((todo) => todo.id === id);
    project.todos.splice(currentIndex, 1);
    localStorageController.removeTodo(id, project);
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
    updateTodoImportant,
    updateTodo,
    removeTodo,
  };
})();
