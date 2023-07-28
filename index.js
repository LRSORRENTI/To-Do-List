
const form = document.getElementById('form');

const input = document.getElementById('input');

const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos){
    todos.forEach(item => {
        addToDo(item)})
    
} else {
    throw new Error('No Todos')
}

form.addEventListener('submit', (event) => {
     event.preventDefault();
     addToDo()
})

const addToDo = (todo) => {
    let todoText = input.value;
    if(todo){
        todoText = todo.text;
    }
    if(todoText){
        const todoEl = document.createElement('li');
        if(todo && todo.completed){
            todoEl.classList.add('completed');
        }
        todoEl.innerText = todoText;
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
        } )

        todoEl.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            todoEl.remove()
        } )


        todosUL.appendChild(todoEl)
        input.value = ''
    }
}

// localStorage.setItem('name', JSON.stringify(obj))
// JSON.parse(localStorage.getItem(obj))