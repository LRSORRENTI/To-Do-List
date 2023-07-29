"use strict";
// Get HTML elements by id
const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
// Parse todos data from local storage. 
// Note that getItem can return null so we have to deal with that
const todoList = JSON.parse(localStorage.getItem('todos') || '[]');
// Function to add a new todo
const addToDo = (todo) => {
    // Get text from the input field, or if a todo object is provided, use its text
    let todoText = input.value;
    if (todo) {
        todoText = todo.text;
    }
    // If there's any text, create a new todo
    if (todoText) {
        const todoEl = document.createElement('li');
        // If the todo is marked as completed, add the 'completed' class to it
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }
        // Set the text of the todo element
        todoEl.innerText = todoText;
        // Add an event listener to toggle the 'completed' class on click
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLocalStorage();
        });
        // Add an event listener to delete the todo on right-click
        todoEl.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            todoEl.remove();
            updateLocalStorage();
        });
        // Append the new todo to the list
        todosUL.appendChild(todoEl);
        // Clear the input field
        input.value = '';
        // Update the todos in local storage
        updateLocalStorage();
    }
};
// Function to update the list of todos in local storage
function updateLocalStorage() {
    const todosEl = document.querySelectorAll('li');
    const todos = [];
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
// If there are any todos in local storage, add them to the list
if (todoList) {
    todoList.forEach(item => addToDo(item));
}
// Add an event listener to prevent form submission and instead add a new todo
form.addEventListener('submit', (event) => {
    event.preventDefault();
    addToDo();
});
