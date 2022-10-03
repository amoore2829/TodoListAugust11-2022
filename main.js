window.addEventListener('load', () => {
//Gets any todos saved in local storage, todos is a global variable
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    
    //Sets username "Name here" to user input
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;
    
    //Saves user input even when page is refreshed
    nameInput.addEventListener('change', (e) =>  {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        //gets content from index.html form "name-content"
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
        //Gives a time the todo was created
            createdAt: new Date().getTime()
        }

        //Adds new todo to the array
        todos.push(todo);

        //turns todo lists into a string and saves items to local storage 
        localStorage.setItem('todos', JSON.stringify(todos));

        //resets so fields are no longer filled (textbox and ticks)
        e.target.reset();

        DisplayTodos()
    })

    DisplayTodos()
})

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        //Check to select if task is finished or not
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        //tells if blue or pink
        if (todo.category == 'personal') {
            span.classList.add('personal');
        }
        else {
            span.classList.add('school');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        //Creates a new text element and displays todo items
        content.innerHTML = `<input type="text" value="${todo.content}" readonly >`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoList.appendChild(todoItem);

        //Set todos to done if checked
        if (todo.done) {
            todoItem.classList.add('done');
        }

        //Calls local storage every time user updates todo
        input.addEventListener('change', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done) {
                todoItem.classList.add('done');
            }
        else {
            todoItem.classList.remove('done');
        }

        DisplayTodos();
        })

        edit.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            //Highlights input
            input.focus();
            //If clicked outside input field, editing will stop
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    })
}



