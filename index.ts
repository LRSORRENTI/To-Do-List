// Get HTML elements by id
const form = document.getElementById('form') as HTMLFormElement;
const input = document.getElementById('input') as HTMLInputElement;
const todosUL = document.getElementById('todos') as HTMLUListElement;

// Parse todos data from local storage. 
// Note that getItem can return null so we have to deal with that
const todoList = JSON.parse(localStorage.getItem('todos') || '[]') as Array<ToDo>;

// Define the structure of a ToDo object
interface ToDo {
    text: string;
    completed: boolean;
}

// Function to add a new todo
const addToDo = (todo?: ToDo) => {
    // Get text from the input field, or if a todo object is provided, use its text
    let todoText = input.value;
    if(todo){
        todoText = todo.text;
    }
    // If there's any text, create a new todo
    if(todoText){
        const todoEl: HTMLLIElement = document.createElement('li');
        // If the todo is marked as completed, add the 'completed' class to it
        if(todo && todo.completed){
            todoEl.classList.add('completed');
        }
        // Set the text of the todo element
        todoEl.innerText = todoText;
        // Add an event listener to toggle the 'completed' class on click
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLocalStorage();
        })

        // Add an event listener to delete the todo on right-click
        todoEl.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
            todoEl.remove();
            updateLocalStorage();
        })

        // Append the new todo to the list
        todosUL.appendChild(todoEl);
        // Clear the input field
        input.value = '';

        // Update the todos in local storage
        updateLocalStorage();
    }
}

// Function to update the list of todos in local storage
function updateLocalStorage(){
    const todosEl: NodeListOf<HTMLLIElement> = document.querySelectorAll('li');
    const todos: ToDo[] = [];
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// If there are any todos in local storage, add them to the list
if(todoList){
    todoList.forEach(item => addToDo(item));
} 

// Add an event listener to prevent form submission and instead add a new todo
form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    addToDo();
});

