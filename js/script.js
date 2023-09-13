{
  const tasks = [
   {
    content: "cos tam",
    done: false,
   }
  ];

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li>
            ${task.content}
            </li>`;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const NewTaskContent = document.querySelector(".js-newTask").value.trim();
    
    if (NewTaskContent === "") {
      return;
    }
    addNewTask(NewTaskContent);
  };
  
  const addNewTask = (NewTaskContent) => {
    tasks.push({
      content: NewTaskContent,

    });
    render();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };
  init();
}
