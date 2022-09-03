export default (function projectList() {
  const projects = [];

  const addProject = (project) => {
    projects.push(project);
    console.log("projectList", projects);
  };

  return { addProject };
})();
