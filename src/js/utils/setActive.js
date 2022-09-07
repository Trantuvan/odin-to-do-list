export default function setActive(element) {
  // *find parentNode
  const parentNode = element.parentNode;
  const children = [...parentNode.children];

  // *remove active class from all children
  children.forEach((child) => child.classList.remove("active"));
  element.classList.add("active");
}
