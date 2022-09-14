import projectController from "../controllers/projectController";
import formView from "../views/formView";

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
        renderTodo(todo);
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
      <input type="checkbox" name="isCompleted" value="false"/>
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

    // render state of the item
    if (todo.isCompleted === true) {
      contentItem.querySelector("input[type=checkbox]").checked = true;
      contentItem.querySelector(".item-title").classList.add("completed");
      contentItem.querySelector(".item-date").classList.add("completed");
    } else {
      contentItem.querySelector("input[type=checkbox]").checked = false;
      contentItem.querySelector(".item-title").classList.remove("completed");
      contentItem.querySelector(".item-date").classList.remove("completed");
    }

    if (todo.isImportant === true) {
      contentItem.querySelector(".fa-regular").classList.add("deactivated");
      contentItem.querySelector(".fa-solid").classList.remove("deactivated");
    } else {
      contentItem.querySelector(".fa-regular").classList.remove("deactivated");
      contentItem.querySelector(".fa-solid").classList.add("deactivated");
    }

    todoViewDomEvents(contentItem, todo);
  };

  const renderUpdate = (id, todo) => {
    const contentItem = document.querySelector(`[data-id="${id}"]`);

    contentItem.querySelector(".item-title").textContent = todo.title;
    contentItem.querySelector(".item-date").textContent = todo.date;

    // render state of the item
    if (todo.isCompleted === true) {
      contentItem.querySelector("input[type=checkbox]").checked = true;
      contentItem.querySelector(".item-title").classList.add("completed");
      contentItem.querySelector(".item-date").classList.add("completed");
    } else {
      contentItem.querySelector("input[type=checkbox]").checked = false;
      contentItem.querySelector(".item-title").classList.remove("completed");
      contentItem.querySelector(".item-date").classList.remove("completed");
    }

    if (todo.isImportant === true) {
      contentItem.querySelector(".fa-regular").classList.add("deactivated");
      contentItem.querySelector(".fa-solid").classList.remove("deactivated");
    } else {
      contentItem.querySelector(".fa-regular").classList.remove("deactivated");
      contentItem.querySelector(".fa-solid").classList.add("deactivated");
    }
  };

  const todoViewDomEvents = (contentItem, todo) => {
    // remove todo
    const deleteBtn = contentItem.querySelector("#icon-delete");

    deleteBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      projectController.removeTodo(contentItem.getAttribute("data-id"));

      const contentList = document.querySelector(".content__list");
      contentList.removeChild(contentItem);
    });

    // update todo
    const updateIcon = contentItem.querySelector("#icon-edit");

    // *open form and populate old content
    updateIcon.addEventListener("click", (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      const modal = document.querySelector(".modal");
      // open modal
      modal.classList.toggle("deactivated");

      // render edit form
      formView.renderEditTodo();

      const formActionInputs = document.querySelectorAll(".form-action input");

      const inputArray = Array.from(formActionInputs).filter(
        (input) => input.type !== "submit"
      );

      // * populate old input fields
      inputArray.forEach((input) => {
        if (input.id === "title") {
          input.value = todo.title;
        }
        if (input.id === "notes") {
          input.value = todo.notes;
        }
        if (input.id === "date") {
          input.value = todo.date;
        }
      });

      const editSubmitBtn = document.querySelector("#edit-todo-submit");
      // *update new fields
      editSubmitBtn.addEventListener("click", (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        const todoForm = document.querySelector(".todo");
        const formActionInputs =
          document.querySelectorAll(".form-action input");

        const inputArray = Array.from(formActionInputs).filter(
          (input) => input.type !== "submit"
        );

        const inputArrayValue = inputArray.map((input) => input.value);

        projectController.updateTodo(
          contentItem.getAttribute("data-id"),
          ...inputArrayValue
        );

        // reset form
        todoForm.reset();

        const modal = document.querySelector(".modal");
        // close modal
        modal.classList.toggle("deactivated");
      });
    });

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
    const itemStatus = contentItem.querySelector("input[type=checkbox]");

    itemStatus.addEventListener("click", (evt) => {
      evt.stopPropagation();

      if (itemStatus.checked === true) {
        contentItem.querySelector(".item-title").classList.add("completed");
        contentItem.querySelector(".item-date").classList.add("completed");
        projectController.updateTodoCompleted(
          contentItem.getAttribute("data-id"),
          itemStatus.checked
        );
      } else {
        contentItem.querySelector(".item-title").classList.remove("completed");
        contentItem.querySelector(".item-date").classList.remove("completed");
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

    formView.renderDetails();

    const details = document.querySelector(".details");

    details.querySelector(".item-title").textContent = `Title: ${todo.title}`;
    details.querySelector(".item-date").textContent = `Date: ${todo.date}`;
    details.querySelector(".item-notes").textContent = `Notes: ${todo.notes}`;
    details.querySelector(".item-important").textContent = `Priority: ${
      todo.isImportant ? "important" : "not important"
    }`;
    details.querySelector(".item-completed").textContent = `Status: ${
      todo.isCompleted ? "completed" : "not completed"
    }`;
  };

  return {
    renderAlltodos,
    renderTodo,
    removeAllChildNodes,
    renderWhenNoProject,
    renderUpdate,
  };
})();
