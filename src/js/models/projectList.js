export default (function projectList() {
  let projects = [];

  const setProjectsFromLocalStorage = (value) => {
    projects = value;
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
