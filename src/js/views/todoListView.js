import projectController from "../controllers/projectController";

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
    contentItem.setAttribute("data-id", todo.id);

    const noTask = contentList.querySelector(".no-todo");

    if (noTask) {
      removeAllChildNodes();
    }

    contentItem.innerHTML = `
    <div class="item-status">
      <input type="checkbox" name="isCompleted" value="false" />
    </div>
    <div class="item-title">${todo.title}</div>
    <div class="item-date">${todo.date}</div>
    <div class="item-actions">
      <button class="btn btn-detail">details</button>
      <i class="fa-regular fa-star icon__star-not-important"></i>
      <i class="fa-solid fa-star icon__star-important deactivated"></i>
      <i class="fa-regular fa-pen-to-square" id="icon-edit"></i>
      <i class="fa-solid fa-trash" id="icon-delete"></i>
    </div>
    `;

    contentList.appendChild(contentItem);

    todoViewDomEvents(contentItem, todo);
  };

  const todoViewDomEvents = (contentItem, todo) => {
    // update important status
    const startIcon = contentItem.querySelectorAll(".fa-star");
    const startIconImportant = contentItem.querySelector(
      ".icon__star-important"
    );
    const startIconNotImportant = contentItem.querySelector(
      ".icon__star-not-important"
    );

    startIcon.forEach((icon) => {
      icon.addEventListener("click", (evt) => {
        const iconClassList = evt.target.classList;

        if (iconClassList.contains("icon__star-not-important")) {
          // hide icon
          startIconNotImportant.classList.toggle("deactivated");
          // show icon
          startIconImportant.classList.toggle("deactivated");

          // *update status to important
          projectController.updateTodoImportant(
            contentItem.getAttribute("data-id"),
            true
          );
        }

        if (iconClassList.contains("icon__star-important")) {
          // show icon
          startIconNotImportant.classList.toggle("deactivated");
          // hide icon
          startIconImportant.classList.toggle("deactivated");

          // *update status to not important
          projectController.updateTodoImportant(
            contentItem.getAttribute("data-id"),
            false
          );
        }
      });
    });

    // update completion status
    const itemStatus = contentItem.querySelector(
      ".item-status input[type=checkbox]"
    );

    itemStatus.addEventListener("click", (evt) => {
      evt.stopPropagation();

      if (itemStatus.checked === true) {
        document.querySelector(".item-title").classList.add("completed");
        document.querySelector(".item-date").classList.add("completed");
        projectController.updateTodoCompleted(
          contentItem.getAttribute("data-id"),
          itemStatus.checked
        );
      } else {
        document.querySelector(".item-title").classList.remove("completed");
        document.querySelector(".item-date").classList.remove("completed");
        projectController.updateTodoCompleted(
          contentItem.getAttribute("data-id"),
          itemStatus.checked
        );
      }
    });
    // show contentItem details
    const detailBtn = contentItem.querySelector(".btn-detail");

    detailBtn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      renderDetail(todo);
    });
  };

  const renderDetail = (todo) => {
    const modal = document.querySelector(".modal");
    modal.classList.toggle("deactivated");

    const modalBody = document.querySelector(".modal-body");

    // remove all children
    while (modalBody.firstChild) {
      modalBody.removeChild(modalBody.firstChild);
    }

    const todoDetail = document.createElement("div");
    todoDetail.setAttribute("id", "details");

    todoDetail.innerHTML = `
      <div class="item-title">Title: ${todo.title}</div>
      <div class="item-date">Date: ${todo.date}</div>
      <div class="item-notes">Notes: ${todo.notes}</div>
      <div class="item-importance">Priority: ${
        todo.isImportant ? "important" : "not important"
      }</div>
      <div class="item-completion">Status: ${
        todo.isCompleted ? "completed" : "not completed"
      }</div>

    `;

    modalBody.appendChild(todoDetail);
  };

  return {
    renderAlltodos,
    renderTodo,
    removeAllChildNodes,
    renderWhenNoProject,
  };
})();
