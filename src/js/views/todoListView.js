export default (function todoListView() {
  const renderAlltodos = (todos) => {
    const contentList = document.querySelector(".content__list");
    const noTask = document.createElement("div");

    if (todos.length > 0) {
      todos.forEach((todo) => {
        noTask.classList.toggle("no-todo");

        const contentItem = document.createElement("li");
        contentItem.setAttribute("class", "content__item");

        contentItem.innerHTML = todo.title;

        contentList.appendChild(contentItem);
      });
    } else {
      noTask.setAttribute("class", "no-todo");

      noTask.innerHTML = "no tasks yet";

      contentList.appendChild(noTask);
    }
  };
  return { renderAlltodos };
})();
