document.addEventListener('DOMContentLoaded', () => {
  render();
});

const root = document.querySelector('#root');
const inputBlock = document.createElement('div');
inputBlock.classList.add('input-block');

const todoInput = document.createElement('input');
todoInput.classList.add('todo-input');

const todoBtn = document.createElement('button');
todoBtn.classList.add('todo-btn');

todoBtn.innerText = '+';
const categoryList = document.createElement('ul');
categoryList.classList.add('category-list');

const tasksBlock = document.createElement('div');
tasksBlock.classList.add('tasks-block');

const tasksList = document.createElement('ul');
tasksList.classList.add('tasks-list');

inputBlock.appendChild(todoInput);
inputBlock.appendChild(todoBtn);
root.appendChild(inputBlock);
root.appendChild(categoryList);
tasksBlock.appendChild(tasksList);
root.appendChild(tasksBlock);

const categoryColor = [
  { color: '#87EE43', active: true },
  { color: '#43EED7', active: false },
  { color: '#5565f3', active: false },
  { color: '#f355de', active: false },
  { color: '#f35555', active: false },
];

const setCategory = (id) => {
  for (let index in categoryColor) {
    if (id === index) {
      categoryColor[index].active = true;
    } else {
      categoryColor[index].active = false;
    }
  }
};

const createCategoryList = () => {
  categoryColor.forEach(function (item, index) {
    const li = document.createElement('li');
    li.setAttribute('id', index);
    li.style.backgroundColor = item.color;
    if (item.active) {
      li.style.border = '2px solid black';
    }
    li.addEventListener('click', () => {
      setCategory(li.getAttribute('id'));
      renderCategoryList();
    });
    categoryList.append(li);
  });
};

const renderCategoryList = () => {
  categoryList.innerHTML = '';
  createCategoryList();
};
renderCategoryList();

let inputValue = '';
const setInputValue = () => {
  inputValue = todoInput.value;
};

todoInput.addEventListener('input', setInputValue);

let todoTasks = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

const handleClickAdd = () => {
  let lastTask = todoTasks[todoTasks.length - 1];
  let newTaskId;
  if (todoTasks.length) {
    newTaskId = lastTask.id + 1;
  } else {
    newTaskId = 0;
  }
  const activeColor = categoryColor.filter((elem) => elem.active);
  const newTask = {
    id: newTaskId,
    text: inputValue,
    color: activeColor[0].color,
  };

  todoTasks = [...todoTasks, newTask];
  inputValue = '';
  todoInput.value = '';
  render();
};
todoBtn.addEventListener('click', () => {
  if (inputValue.trim()) {
    handleClickAdd();
  }
});

const handleClickRemove = (id) => {
  const question = confirm('?????????????', '');
  if (question) {
    todoTasks = todoTasks.filter((elem) => Number(elem.id) !== Number(id));
    render();
  }
};
const handleClickRename = (id) => {
  const newTextTask = prompt('?????????????? ?????????? ????????????', '');
  if (newTextTask.trim()) {
    for (let elem of todoTasks) {
      if (Number(elem.id === Number(id))) {
        elem.text = newTextTask;
      }
    }
    render();
  }
};

let idTask;
const createTaskBtn = (id, text, funcBtn, classBtn) => {
  const taskBtn = document.createElement('button');
  taskBtn.setAttribute('id', id);
  taskBtn.setAttribute('class', 'task-btn');
  taskBtn.classList.add(classBtn);
  taskBtn.innerHTML = text;
  taskBtn.addEventListener('click', () => {
    idTask = taskBtn.getAttribute('id');
    funcBtn(idTask);
  });
  return taskBtn;
};

const renderTasksList = () => {
  for (let elem of todoTasks) {
    const task = document.createElement('li');
    task.setAttribute('id', elem.id);
    task.innerHTML = elem.text;
    task.style.border = `2px solid ${elem.color}`;

    tasksList.append(task);
    tasksList.append(createTaskBtn(elem.id, 'x', handleClickRemove, 'remove'));
    tasksList.append(createTaskBtn(elem.id, '??????????????????????????', handleClickRename, 'rename'));
  }
};

const render = () => {
  tasksList.innerHTML = '';
  localStorage.setItem('items', JSON.stringify(todoTasks));
  renderTasksList();
};
