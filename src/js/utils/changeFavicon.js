export default function changeFavicon(src) {
  const link = document.createElement("link");
  const oldLink = document.getElementById("dynamic-favicon");

  link.id = "dynamic-favicon";
  link.rel = "shortcut icon";
  link.href = src;

  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}
