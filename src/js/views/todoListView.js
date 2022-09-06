export default (function todoListView() {
  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  const renderAlltodos = (todos) => {
    const contentList = document.querySelector(".content__list");

    if (todos.length > 0) {
      todos.forEach((todo) => {
        removeAllChildNodes(contentList);

        const contentItem = document.createElement("li");
        contentItem.setAttribute("class", "content__item");

        contentItem.innerHTML = todo.title;

        contentList.appendChild(contentItem);
      });
    } else {
      removeAllChildNodes(contentList);
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
      removeAllChildNodes(contentList);
    }

    contentItem.innerHTML = `${todo.title}`;

    contentList.appendChild(contentItem);
  };
  return { renderAlltodos, renderTodo };
})();
