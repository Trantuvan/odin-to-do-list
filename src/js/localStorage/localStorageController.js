export default (function localStorageController() {
  let projectArray = JSON.parse(localStorage.getItem("projectArray"));

  // console.log("string: ", localStorage.getItem("projectArray"));
  // console.log(`array: ${projectArray.constructor === Array}`, projectArray);

  const storageAvailable = (type) => {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  };

  const initProjectArray = () => {
    if (projectArray === null) {
      localStorage.setItem("projectArray", JSON.stringify([]));
    }
  };

  const addProject = (project) => {
    projectArray.push(project);
    // *override old key "projectArray" with new array of project objects
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  const updateProjectName = (id, name) => {
    const currentProject = projectArray.find((project) => project.id === id);
    currentProject.setName(name);
    localStorage.setItem("projectArray", JSON.stringify(projectArray));
  };

  return {
    get projectArray() {
      return projectArray;
    },
    storageAvailable,
    initProjectArray,
    addProject,
    updateProjectName,
  };
})();
