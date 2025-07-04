const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (savedTodos) {
  savedTodos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value.trim();

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement('li');
    todoEl.textContent = todoText;

    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    // Toggle completed on click
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    // Right-click to delete
    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (confirm("Delete this task?")) {
        todoEl.remove();
        updateLS();
      }
    });

    // Double click to edit
todoEl.addEventListener('dblclick', () => {
  const currentText = todoEl.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.style.fontSize = "1.1rem";
  input.style.width = "100%";
  input.style.border = "none";
  input.style.outline = "none";
  input.style.padding = "0.5rem";

  todoEl.textContent = ""; // Clear the current li text
  todoEl.appendChild(input);
  input.focus();

  // When user presses Enter or blurs the input
  input.addEventListener("blur", finishEdit);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      finishEdit();
    }
  });

  function finishEdit() {
    const newText = input.value.trim();
    if (newText !== "") {
      todoEl.textContent = newText;
    } else {
      todoEl.textContent = currentText; // fallback to old value
    }
    updateLS();
  }
});


    todosUL.appendChild(todoEl);
    input.value = '';
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('li');
  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.textContent,
      completed: todoEl.classList.contains('completed')
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}
