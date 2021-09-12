console.log("renderer");

window.addEventListener("DOMContentLoaded", () => {
  const createButton = document.getElementById("create");
  createButton.addEventListener("click", () => {
    const name = document.getElementById("directory_name").value;
    if (!name) return;

    window.electron.createNewDirectory(name).then(() => {
      alert(`Directory "${name}" was created successfully.`);
    });
  });
});
