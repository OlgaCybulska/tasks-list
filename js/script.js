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
  console.log(tasks);
  renderButtons();
};
const allTaskDoneFunction = () => {
  tasks = tasks.map((task) => ({...task, done: true}));

  render();
  console.log(tasks);
};
const renderButtons = () => {

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
  const buttonsElement = document.querySelector(".js-buttons");
  if (tasks.length > 0) {
    buttonsElement.innerHTML = `<button>Ukryj ukończone</button>
    <button>Ukończ wszystkie</button>`
  } else { buttonsElement.innerHTML = ``;}
   
  const allDoneTaskButton = document.querySelector(".js-doneAll");

  allDoneTask = (allTaskDoneFunction) => {
    allDoneTaskButton.addEventListener("click", () => {
      allTaskDoneFunction();
    });
  };
   
};

const renderTasks = () => {
  
  let htmlString = "";

  for (const task of tasks) {
    htmlString += `
            <li class="list__item">
            <button class="js-done list__button list__button--done">${
              task.done ? "✔" : ""
            }</button>
            <span class="${
              task.done ? "list__task--done" : "list__item--text"
            }">${task.content}</span>
            <button class="js-remove list__button list__button--remove"></button>
            </li>`;
  }

  document.querySelector(".js-tasks").innerHTML = htmlString;
  
};

const onFormSubmit = (event) => {
  event.preventDefault();

  const newTaskContent = document.querySelector(".js-newTask").value.trim();

  if (newTaskContent === "") {
    return;
  }
  addNewTask(newTaskContent);
};
 const render = () => {
  renderTasks();
  renderButtons();
 }
const init = () => {
  render();

  const form = document.querySelector(".js-form");
  form.addEventListener("submit", onFormSubmit);
};

init();
