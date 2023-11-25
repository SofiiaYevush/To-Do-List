// localStorage.removeItem('tasks');

const appContainer = document.querySelector('.container');
const taskInput = document.querySelector('.input-task');
const submitButton = document.querySelector('.submit-task');
const taskList = document.querySelector('.task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-list-item');

    const label = document.createElement('label');
    label.classList.add('task-list-item-label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      toggleCompleted(index);
    });

    const span = document.createElement('span');
    span.textContent = task.name;
    if (task.completed) {
      span.style.textDecoration = 'line-through';
      span.style.color = 'gray';
    }

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.title = 'Delete Task';
    deleteBtn.textContent = task.del;
    deleteBtn.addEventListener('click', () => {
      deleteItem(index);
    });

    label.appendChild(checkbox);
    label.appendChild(span);
    listItem.appendChild(label);
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
  });
}

function addItem() {
  const taskName = taskInput.value.trim();
  if (taskName === '') {
    return;
  }
  tasks.push({ name: taskName, del: '', completed: false });
  taskInput.value = '';
  updateTaskList();
  saveToLocalStorage();
}

function deleteItem(index) {
  tasks.splice(index, 1);
  updateTaskList();
  saveToLocalStorage();
}

// Функція для зміни стану завдання (виконано/не виконано)
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

submitButton.addEventListener('click', addItem);
taskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addItem();
  }
});

updateTaskList();
