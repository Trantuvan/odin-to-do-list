import project from "./project";
import todo from "./todo";

export default (function projectList() {
  let projects = [];

  const setProjectsFromLocalStorage = (value) => {
    // JSON only read string values, function will not be return when json parse
    const newProjectList = value.map((elem) => {
      return populateProjects(elem);
    });
    projects = newProjectList;
  };

  const populateProjects = (elem) => {
    if (elem.todos.length < 0) {
      return Object.assign({}, project(""), { id: elem.id, name: elem.name });
    } else {
      const todos = elem.todos.map((elem) => populateTodo(elem));

      return Object.assign({}, project(""), {
        id: elem.id,
        name: elem.name,
        todos: todos,
      });
    }
  };

  const populateTodo = (elem) => {
    const todos = Object.assign(
      {},
      todo({
        title: "",
        notes: "",
        date: "",
      }),
      {
        id: elem.id,
        title: elem.title,
        notes: elem.notes,
        isCompleted: elem.isCompleted,
        isImportant: elem.isImportant,
        date: elem.date,
      }
    );
    return todos;
  };

  const addProject = (project) => {
    projects.push(project);
  };

  const getProject = (id) => {
    return projects.find((project) => project.id === id);
  };

  const updateProject = (id, name) => {
    const currentProject = projects.find((project) => project.id === id);
    currentProject.setName(name);
  };

  const removeProject = (id) => {
    const currentIndex = projects.findIndex((project) => project.id === id);
    return projects.splice(currentIndex, 1);
  };

  return {
    get projects() {
      return projects;
    },
    addProject,
    updateProject,
    removeProject,
    getProject,
    setProjectsFromLocalStorage,
  };
})();
