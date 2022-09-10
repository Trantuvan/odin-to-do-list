export default (function formView() {
  const modalBody = document.querySelector(".modal-body");

  const removeAllChildNodes = () => {
    while (modalBody.firstChild) {
      modalBody.removeChild(modalBody.firstChild);
    }
  };

  const renderCreateTodo = () => {
    // remove allChildren of modal body
    removeAllChildNodes();
    const form = document.createElement("form");
    form.classList.add("todo");

    form.innerHTML = `
    <div class="form-action">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" />
    </div>
    <div class="form-action">
        <label for="notes">Notes</label>
        <input type="text" name="notes" id="notes" />
    </div>
    <div class="form-action">
        <label for="date">Date</label>
        <input type="date" name="date" id="date" />
    </div>
    <div class="form-action">
        <button class="btn" id="add-todo-submit" type="button">
            Submit
        </button>
    </div>
    `;

    modalBody.appendChild(form);
  };

  const renderEditTodo = () => {
    removeAllChildNodes();
    const form = document.createElement("form");
    form.classList.add("todo");

    form.innerHTML = `
    <div class="form-action">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" />
    </div>
    <div class="form-action">
        <label for="notes">Notes</label>
        <input type="text" name="notes" id="notes" />
    </div>
    <div class="form-action">
        <label for="date">Date</label>
        <input type="date" name="date" id="date" />
    </div>
    <div class="form-action">
        <button class="btn" id="edit-todo-submit" type="button">
            Edit
        </button>
    </div>
    `;

    modalBody.appendChild(form);
  };

  const renderDetails = () => {
    removeAllChildNodes();
    const details = document.createElement("div");
    details.classList.add("details");

    details.innerHTML = `
    <div class="item-title">Title:</div>
    <div class="item-date">Date:</div>
    <div class="item-notes">Notes:</div>
    <div class="item-important">Priority:</div>
    <div class="item-completed">Status:</div>
  `;

    modalBody.appendChild(details);
  };

  return { renderCreateTodo, renderEditTodo, renderDetails };
})();
