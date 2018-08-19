const todoForm = document.querySelector('.todo-form');
const todoInput = todoForm.querySelector('input');
const todoCard = document.querySelector('.todoCard');

let todos = []
let status = false
let ref

function createList(){
    const lists = todos.map((todo, i) => `<li class="list-group-item d-flex align-items-center justify-content-between">
    ${todo.done?`<del>${todo.task}</del>`:`${todo.task}`} ${todo.edited?`<small>updated</small>`: ''}
    <div class="task-options">
        <button class="delete btn btn-danger" onclick="editTodo(${i})">🗡</button>
        ${todo.done?`<span onclick="todoDone(${i})" class="done btn btn-primary">↩️</span>`:`<span onclick="todoDone(${i})" class="done btn btn-primary">✔️</span>`}
        <button class="delete btn btn-danger" onclick="deleteTodo(${i})">✖️</button>
    </div>
</li>`).join('')
    todoCard.innerHTML = lists
}

function deleteTodo(index){
    todos.splice(index, 1)
    createList()
}

function todoDone(index){
    todos[index].done = !todos[index].done
    createList()
}

function editTodo(index){
    status = true
    ref = index
    todoInput.value = todos[index].task
}

function todoLists(e){
    e.preventDefault()
    if(!status){
        todos.unshift({
            task: todoInput.value,
            done: false,
            edited: false
        })
    }else{
        if(todos[ref].task !== todoInput.value) todos[ref].edited = true
        todos[ref].task = todoInput.value
        status = false
    }

    createList()
    todoInput.value = ''
}


todoForm.addEventListener('submit', todoLists);