export default (function projectListView() {
  const projects = [];

  const addProject = (newProject) => projects.push(newProject);

  const render = () => {
    const navList = document.querySelector(".nav__list");
    const navItem = document.createElement("li");
    navItem.setAttribute("class", "nav__item");

    navItem.innerHTML = `
      <div class="item__content">${projects.at(-1).name}</div>
      <div class="item__actions">
        <i class="fa-regular fa-pen-to-square fa-xs edit-action"></i>
        <i class="fa-regular fa-trash-can fa-xs delete-action"></i>
      </div>
    `;

    navList.appendChild(navItem);
  };

  return { addProject, render };
})();
