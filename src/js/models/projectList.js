export default (function projectList() {
  const projects = [];

  const addProject = (project) => {
    projects.push(project);
  };

  return { addProject };
})();
