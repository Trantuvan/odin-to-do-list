export default function initProjectArray() {
  let projectArray = localStorage.getItem("projectArray");

  if (projectArray === null) {
    localStorage.setItem("projectArray", JSON.stringify([]));
  }
}
