let tasks = [
  {
    content: "test",
    done: false,
  },
  {
    content: "test2",
    done: true,
  },
];

let hideDoneTasks = false;

const addNewTask = (newTaskContent) => {
  tasks = [...tasks, { content: newTaskContent }];
  render();
};

const removeTask = (index) => {
  tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
  render();
};

const toggleTaskDone = (index) => {
  tasks = [
    ...tasks.slice(0, index),
    { ...tasks[index], done: true },
    ...tasks.slice(index + 1),
  ];
  render();
};

const showOrHideDoneTasks = () => {
  hideDoneTasks = !hideDoneTasks;
  render();
};

const markAllDone = () => {
  tasks = tasks.map((task) => ({
    ...task,
    done: true,
  }));
  render();
};

const bindEvents = () => {
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

const renderTasks = () => {
  let htmlString = "";

  for (const task of tasks) {
    htmlString += `
            <li class="list__item ${
              task.done && hideDoneTasks ? "list__item--hidden" : ""}">
            <button class="js-done list__button list__button--done">${
              task.done ? "✔" : ""
            }</button>
            <span class="${
              task.done ? "list__task--done" : "list__item--text"
            }">${task.content}</span>
            <button class="js-remove list__button list__button--remove">🗑</button>
            </li>`;
  }

  document.querySelector(".js-tasks").innerHTML = htmlString;
};

const renderButtons = () => {
  const buttonsElement = document.querySelector(".js-buttons");

  if (tasks.length > 0) {
    buttonsElement.innerHTML = `<button class="js-toggleShowHide section__button">${
      hideDoneTasks ? "Pokaż" : "Ukryj"
    } ukończone</button>
    <button class="js-allDoneTask section__button" ${
      tasks.every(({ done }) => done) ? "disabled" : ""
    } >Ukończ wszystkie</button>`;
  } else {
    buttonsElement.innerHTML = ``;
  }
};

const bindToggleDoneEvents = () => {
  
  const toggleShowHideButton = document.querySelector(".js-toggleShowHide");

  if (toggleShowHideButton) {
    toggleShowHideButton.addEventListener("click", showOrHideDoneTasks);
  };

  const markAllTasksDoneButton = document.querySelector(".js-allDoneTask");

  if (markAllTasksDoneButton) {
    markAllTasksDoneButton.addEventListener("click", markAllDone);
  };
};

const render = () => {
  renderTasks();
  renderButtons();
  bindEvents();
  bindToggleDoneEvents();
};

const onFormSubmit = (event) => {
  event.preventDefault();

  const newTaskContent = document.querySelector(".js-newTask").value.trim();
  
  if (newTaskContent === "") {
    return;
  }
  addNewTask(newTaskContent);
};

const init = () => {
  render();

  const form = document.querySelector(".js-form");
  form.addEventListener("submit", onFormSubmit);
};

init();
