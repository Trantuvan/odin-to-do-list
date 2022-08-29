export default (function projectList() {
  const projects = [];

  const addProject = (project) => {
    console.log("projects before", projects);
    projects.push(project);
    console.log("projects after", projects);
  };

  return { addProject };
})();
