let todoList = localStorage.getItem('ToDoList');
todoList = [];
displayItems();


function addTodo(){
  let inputElement = document.getElementById('todo_input');
  let todoItem = inputElement.value;

  let dateElement = document.getElementById('todo_date');
  let todoDate = dateElement.value;

  todoList.push({item: todoItem, dueDate: todoDate});
  
  inputElement.value = '';
  dateElement.value = '';

  displayItems();
}

function displayItems(){
  let containerElement = document.querySelector('.todo_container')

  let newHtml = '';
  for(let i = 0; i < todoList.length; i++){
    let {item, dueDate} = todoList[i];

    newHtml += `
       <span>${item}</span>
       <span>${dueDate}</span>
       <button class="button_delete" onclick = "deleteTodo(${i})">Delete</button>
    `;
  }
  containerElement.innerHTML = newHtml;
  localStorage.setItem('ToDoList', JSON.stringify(todoList));
}

function deleteTodo(index) {
  todoList.splice(index, 1); 
  displayItems(); 
}
