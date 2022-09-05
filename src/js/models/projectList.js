export default (function projectList() {
  const projects = [];

  const addProject = (project) => {
    projects.push(project);
    console.log("addProject", projects);
  };

  const getProject = (id) => {
    return projects.find((project) => project.id === id);
  };

  const updateProject = (id, name) => {
    const currentProject = projects.find((project) => project.id === id);
    currentProject.name = name;
  };

  const removeProject = (id) => {
    const currentIndex = projects.findIndex((project) => project.id === id);
    return projects.splice(currentIndex, 1);
  };

  return { addProject, updateProject, removeProject, getProject };
})();
