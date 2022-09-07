export default (function todoListView() {
  const removeAllChildNodes = () => {
    const contentList = document.querySelector(".content__list");
    while (contentList.firstChild) {
      contentList.removeChild(contentList.firstChild);
    }
  };

  const renderWhenNoProject = () => {
    removeAllChildNodes();
    const contentList = document.querySelector(".content__list");
    const noTask = document.createElement("div");
    noTask.setAttribute("class", "no-todo");

    noTask.innerHTML = "must click to choose project first";
    contentList.appendChild(noTask);
  };

  const renderAlltodos = (todos) => {
    const contentList = document.querySelector(".content__list");

    if (todos.length > 0) {
      removeAllChildNodes();

      todos.forEach((todo) => {
        const contentItem = document.createElement("li");
        contentItem.setAttribute("class", "content__item");

        contentItem.innerHTML = todo.title;

        contentList.appendChild(contentItem);
      });
    } else {
      removeAllChildNodes();
      const noTask = document.createElement("div");
      noTask.setAttribute("class", "no-todo");

      noTask.innerHTML = "no tasks yet";

      contentList.appendChild(noTask);
    }
  };

  const renderTodo = (todo) => {
    const contentList = document.querySelector(".content__list");
    const contentItem = document.createElement("li");
    contentItem.setAttribute("class", "content__item");

    const noTask = contentList.querySelector(".no-todo");

    if (noTask) {
      removeAllChildNodes();
    }

    contentItem.innerHTML = `
    <div class="item-title">${todo.title}</div>
    <div class="item-date">${todo.date}</div>
    <div class="item-actions">
      <button class="btn btn-detail">details</button>
      <i class="fa-regular fa-star icon__star"></i>
      <i class="fa-solid fa-star icon__star-selected"></i>
      <i class="fa-regular fa-pen-to-square" id="icon-edit"></i>
      <i class="fa-solid fa-trash" id="icon-delete"></i>
    </div>
    `;

    contentList.appendChild(contentItem);
  };
  return {
    renderAlltodos,
    renderTodo,
    removeAllChildNodes,
    renderWhenNoProject,
  };
})();
