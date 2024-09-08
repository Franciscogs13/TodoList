// @ts-nocheck
const inputTarefa = document.querySelector('.nova_tarefa');
const addTarefa = document.querySelector('.add_tarefa');
const lista = document.querySelector('.tarefas');

function createLi() {
  const li = document.createElement('li');
  return li;
}
inputTarefa.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    createTask(inputTarefa.value, false);
  }
});

function createTask(inputText, done = false) {
  const li = createLi();
  li.innerHTML = inputText;
  li.style.fontWeight = 'bold'; 
  if (done) {
    li.classList.add('concluido');
  }
  lista.appendChild(li);
  clearInput();
  taskDone(li);
  deleteTask(li);
  saveTasks();
}

function clearInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function deleteTask(li) {
  li.innerHTML += '';
  const deleteBtn = document.createElement('img');
  deleteBtn.setAttribute('src', 'assets/img/lixeira.png');
  deleteBtn.setAttribute('class', 'btn_lixeira');
  li.appendChild(deleteBtn);
}
function taskDone(li) {
  const done = document.createElement('img');
  done.setAttribute('src', 'assets/img/check.png');
  done.setAttribute('class', 'check');
  done.addEventListener('click', () => {
    li.classList.toggle('concluido');
    saveTasks();
  });
  li.appendChild(done);
}

addTarefa.addEventListener('click', (e) => {
  if (!inputTarefa.value) return;
  createTask(inputTarefa.value, false);
});

document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('btn_lixeira')) {
    el.parentElement.remove();
    saveTasks();
  } else if (el.classList.contains('check')) {
    el.parentElement.classList.toggle('concluido')
    saveTasks();
  }
});

function saveTasks() {
  const tasks = lista.querySelectorAll('li');
  const tasksList = [];

  for (let task of tasks) {
    let taskText = task.textContent.trim();
    let taskDone = task.classList.contains('concluido');
    tasksList.push({ text: taskText, done: taskDone });
  }

  const taskJSON = JSON.stringify(tasksList);
  localStorage.setItem('tarefas', taskJSON);
}

function addSavedTask() {
  const task = localStorage.getItem('tarefas');
  const tasksList = JSON.parse(task);

  for (let task of tasksList) {
    createTask(task.text, task.done);
  }
}
addSavedTask();
