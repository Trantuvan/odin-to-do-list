export default (function projectListView() {
  const projects = [];

  const addProject = (newProject) => projects.push(newProject);

  const render = () => {
    const navList = document.querySelector(".nav__list");
    console.log(navList);
    const navItems = projects.map((project) => {
      return `<li class="nav__item">${project.name}</li>`;
    });
    console.log(navItems);
    navList.innerHTML = navItems;
  };

  return { addProject, render };
})();
