const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');
const filterOption = document.querySelector('.filter_todo');


const addTodo = e => {
    e.preventDefault();
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo_item');
    todoDiv.appendChild(newTodo);


    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete_button');
    todoDiv.appendChild(completedButton);
    

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash_button');
    todoDiv.appendChild(trashButton);
    
    todoList.appendChild(todoDiv);
    todoInput.value = '';
}


const deleteCheck = e => {
    const item = e.target;
    
    if (item.classList[0] === 'trash_button') {
        const todo = item.parentElement;
        todo.classList.add('fall');

        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }
    
    if (item.classList[0] === 'complete_button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


const filterTodo = e => {
    const todos = document.querySelectorAll('.todo');
    const filterValue = e.target.value;

    todos.forEach(function(todo){
        if(filterValue === 'all'){
            todo.style.display = 'flex';
        }

        else if(filterValue === 'completed'){
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex';
            } 

            else{   
                todo.style.display = 'none';
            }
        }
        
        else{
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            } 
            else{
                todo.style.display = 'none';
            }
        }
    });
}


todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);