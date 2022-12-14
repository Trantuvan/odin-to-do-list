export default (function localStorageController() {
  let projectArray = JSON.parse(localStorage.getItem("projectArray"));
  let currentProject = {};

  const storageAvailable = (type) => {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  };

  const initProjectArray = () => {
    if (projectArray === null) {
      localStorage.setItem("projectArray", JSON.stringify([]));
    }
  };

  const addProject = (project) => {
    projectArray = JSON.parse(localStorage.getItem("projectArray"));

    projectArray.push(project);
    // *override old key "projectArray" with new array of project objects
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  const updateProjectName = (id, name) => {
    projectArray = JSON.parse(localStorage.getItem("projectArray"));

    const currentProject = projectArray.find((project) => project.id === id);

    currentProject.name = name;
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  const removeProject = (id) => {
    projectArray = JSON.parse(localStorage.getItem("projectArray"));

    const currentIndex = projectArray.find((project) => project.id === id);
    projectArray.splice(currentIndex, 1);
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  const addTodo = (todo) => {
    projectArray = JSON.parse(localStorage.getItem("projectArray"));

    projectArray
      .find((project) => project.id === currentProject.id)
      .todos.push(todo);

    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  const updateComplete = (id, bool, currProject) => {
    projectArray = JSON.parse(localStorage.getItem("projectArray"));

    const localStorageProject = projectArray.find(
      (project) => project.id === currProject.id
    );

    localStorageProject.todos.find((todo) => todo.id === id).isCompleted = bool;

    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  const updateImportant = (id, bool, currProject) => {
    projectArray = JSON.parse(localStorage.getItem("projectArray"));

    const localStorageProject = projectArray.find(
      (project) => project.id === currProject.id
    );

    localStorageProject.todos.find((todo) => todo.id === id).isImportant = bool;

    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  const updateTodo = (id, currProject, args) => {
    projectArray = JSON.parse(localStorage.getItem("projectArray"));

    const localStorageProject = projectArray.find(
      (project) => project.id === currProject.id
    );

    localStorageProject.todos.find((todo) => todo.id === id).title = args[0];
    localStorageProject.todos.find((todo) => todo.id === id).notes = args[1];
    localStorageProject.todos.find((todo) => todo.id === id).date = args[2];

    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  const removeTodo = (id, currProject) => {
    projectArray = JSON.parse(localStorage.getItem("projectArray"));

    const localStorageProject = projectArray.find(
      (project) => project.id === currProject.id
    );

    const currentIndex = localStorageProject.todos.findIndex(
      (todo) => todo.id === id
    );

    localStorageProject.todos.splice(currentIndex, 1);

    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  const setCurrentProject = (value) => {
    currentProject = value;
  };

  return {
    get projectArray() {
      return projectArray;
    },
    storageAvailable,
    initProjectArray,
    addProject,
    updateProjectName,
    removeProject,
    addTodo,
    setCurrentProject,
    removeTodo,
    updateComplete,
    updateImportant,
    updateTodo,
  };
})();
