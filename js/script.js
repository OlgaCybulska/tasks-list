{
  const tasks = [];
  
  const addNewTask = (NewTaskContent) => {
    tasks.push({
      content: NewTaskContent,
    });
    render();
  };
  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  };
  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done;
    render();
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li class="list__item">
            <button class="js-done list__button list__button--done">${
              task.done ? "✔" : ""
            }</button>
            <span class="${task.done ? "list__task--done" : "list__item--text"}">${task.content}</span>
            <button class="js-remove list__button list__button--remove"></button>
            </li>`;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

  toggleDoneButtons.forEach((toggleDoneButton, index) => {
    toggleDoneButton.addEventListener("click", () => {
      toggleTaskDone(index);
    });
  });
  };

  

  const onFormSubmit = (event) => {
    event.preventDefault();

    const NewTaskContent = document.querySelector(".js-newTask").value.trim();

    if (NewTaskContent === "") {
      return;
    }
    addNewTask(NewTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
