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

    contentItem.innerHTML = `${todo.title}`;

    contentList.appendChild(contentItem);
  };
  return {
    renderAlltodos,
    renderTodo,
    removeAllChildNodes,
    renderWhenNoProject,
  };
})();
