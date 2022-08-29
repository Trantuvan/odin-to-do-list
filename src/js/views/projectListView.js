export default (function projectListView() {
  const projects = [];

  const addProject = (newProject) => projects.push(newProject);

  const render = () => {
    const navList = document.querySelector(".nav__list");

    const navItems = projects.forEach((project) => {
      const navItem = document.createElement("li");
      navItem.className = "nav__item";
      navItem.innerHTML = `${project.name}`;
    });
  };

  return { addProject, render };
})();
