'use strict'


const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const initTodoData = function() {
    let arr = JSON.parse(localStorage.getItem('memory'));
    if(arr === null) {
        arr = [
            {
                value: '',
                completed: false,
            },
        ];
    } return arr;
}; 

const todoData = initTodoData();

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {

        if(item.value !== '') {
            const li = document.createElement('li');
            li.classList.add('todo-item');

            li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' +
            '</div>';

            if(item.completed) {
            todoCompleted.append(li);
            } else {
            todoList.append(li);
            }
            const btnTodoComplete = li.querySelector('.todo-complete');
            btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
            });
            btnTodoComplete.addEventListener('click', function() {
                localStorage.setItem('memory', JSON.stringify(todoData));
            });
            const btnTodoRemove = li.querySelector('.todo-remove');
            btnTodoRemove.addEventListener('click', function(event) {
                if (item.value === event.target.closest('li').textContent) {
                    let index = todoData.indexOf(item);
                    todoData.splice(index,1);
                }
                event.target.closest('li').remove();
            });
            btnTodoRemove.addEventListener('click', function() {
                localStorage.setItem('memory', JSON.stringify(todoData));
            });
        }
        
    }); 
};


todoControl.addEventListener('submit', function(event){    
    event.preventDefault();
    if(headerInput.value == '') {
        return;
    }
    const newTodo = {
        value: headerInput.value,
        completed: false
    };       
    todoData.push(newTodo);        
    localStorage.setItem('memory', JSON.stringify(todoData));
    headerInput.value = '';
    render();
});
 
render();
