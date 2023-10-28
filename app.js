const activeList = document.querySelector('#active-list');
const completedList = document.querySelector('#completed-list');
const lists = document.querySelectorAll('ul');

const activeCount = document.querySelector('.active-count');
const completedCount = document.querySelector('.completed-count');

activeCount.innerHTML = activeList.childElementCount;
completedCount.innerHTML = completedList.childElementCount;

let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

const input = document.querySelector('#input');

lists.forEach(list => list.addEventListener("click", function (event) {
  const target = event.target;
  const task = target.closest("li");
  const taskId = Number(task.getAttribute("id"));

  if (target && target.id === "complete") {
    if (activeList.contains(task)) {
      const indexOf = taskList.findIndex((element) => element.id === taskId);
      taskList[indexOf].isDone = true;
      task.remove();
      completedList.append(task);
    } else {
      const indexOf = taskList.findIndex((element) => element.id === taskId);
      taskList[indexOf].isDone = false;
      task.remove();
      activeList.append(task);
    }
  }
  if (target && target.id === "remove") {
    taskList = taskList.filter((item) => item.id !== taskId);
    task.remove();
  }

  localStorage.setItem("taskList", JSON.stringify(taskList));
  activeCount.innerHTML = activeList.childElementCount;
  completedCount.innerHTML = completedList.childElementCount;
}));

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    console.log('enter press')
    addTask();
  }
});

function addTask() {
  const taskName = input.value;
  if (!taskName) return;

  const task = {
    name: taskName,
    isDone: false,
    id: Date.now()
  }

  taskList.push(task);
  const li = createTask(task);
  localStorage.setItem('taskList', JSON.stringify(taskList));
  activeList.append(li);
  input.value = "";
  activeCount.innerHTML = activeList.childElementCount
}

function createTask(task) {
  const li = document.createElement("li");
  li.id = task.id;

  li.innerHTML = `
      <div class="task">
        <p>
          <button id="complete"></button>
          ${task.name}
          <button id="remove">x</button>
        </p>
      </div>   
  `;

  return li;
}

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
  storedTasks.forEach((task) => {
    const li = createTask(task);
    if (task.isDone) {
      completedList.appendChild(li);
    } else {
      activeList.appendChild(li);
    }
  });

  activeCount.innerHTML = activeList.childElementCount;
  completedCount.innerHTML = completedList.childElementCount;
};

window.addEventListener("load", loadTasks);

