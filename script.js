
// selecting dom elements

const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoContainer = document.querySelector('.todo-container')
const todoform = document.querySelector('.todo-form')
const alert = document.querySelector('.alert')
const select = document.getElementById('select')
const myLogo = document.querySelector('.logo-img')

// Global elemnts
let todoItem;
let editing = false;
let editingItem;
let editingItemDelelteBtn;


// ===============================
//     logo to my url redirect
// ===============================
myLogo.addEventListener('click',()=> {
    window.open("https://ashish-nagar.netlify.app/", '_blank');
})


// =====================================
//      previenting default submit
// =====================================
todoform.addEventListener('click', (event)=> {
    // prevent from automatic submit
        event.preventDefault();
})


// ================================================
//  INputing more than 40  words prohabited warning
// ================================================
todoInput.addEventListener('input', () => {
    if (todoInput.value.length >= 25) {
        Addalert(`You have add ${todoInput.value.length} word. Remember That you can not add more than 40 words`, 'red')
    }
})


// =====================================
//     on reload getting from local
// =====================================
document.addEventListener('DOMContentLoaded', getTodos);


// =============================
//  adding , deleting todos
// ============================
todoButton.addEventListener('click', (event) => {

    if( todoInput.value !== '' && !editing){
        createNewTodo(todoInput.value)
        Addalert('Your item added in the list', 'blue')
        SaveToLocal(todoInput.value);
        todoInput.value = '';
    }

    else if( todoInput.value !== '' && editing) {
        editingItemDelelteBtn.classList.remove('disabled-item')
        editingItem.innerText = todoInput.value 
        Addalert('Your item Edited in the list', 'blue')
        setToDefault()
    }

    else(
        Addalert('Alert : Please Write Something To Add', 'red')
    )
})

// =================================
//      setting all to defaulf
// ==================================

function setToDefault() {
    todoInput.value = ""
    editing = false
}


// =================================
//      Alert Setting function
// ==================================
function Addalert(text,className){
    alert.classList.add(`alert-${className}`)
    alert.textContent = `${text}`

    setTimeout(() => {
        alert.classList.remove(`alert-${className}`)
        alert.innerHTML =  `<span>instructions : </span> Add items To See Here `
    }, 3000);
}



// =================================
//      Creating a new Todo 
// ==================================
function createNewTodo(value) {
    todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')
    todoItem.innerHTML = `
    <p class='todo-text'>${value}</p>
    <div>
      <i class="fas fa-check"></i>
      <i class="fa-solid fa-pen"></i>
      <i class="fas fa-trash"></i>
    `
    todoContainer.appendChild(todoItem)
}


// =============================================
//       Removing ,Editing , and Checking Todo 
// ===========================================
todoContainer.addEventListener('click', (e)=> {

    // itemss --> is parent element of clicked delete button
    let itemss = e.target.parentElement.parentElement;

       //    Deleting item
    if (e.target.classList.contains('fa-trash')) {
        itemss.classList.add('fall')
        itemss.remove()
        removeLocalTodos(itemss.firstElementChild.innerText)
        Addalert(`You just deleted an item`, 'red')
    }
    
    // checking item
    if (e.target.classList.contains('fa-check')) {
 
        if(itemss.firstElementChild.classList.contains('checked')) {
            itemss.firstElementChild.classList.remove('checked')
            Addalert(`Your work Unmarked`, 'red')
        } 
        
        else {
        itemss.firstElementChild.classList.add('checked')
            Addalert(`Your work marked as done`, 'blue')
        }
    }

    // edit item
    if (e.target.classList.contains('fa-pen')){
        editing = true

        editingItemDelelteBtn = itemss
        editingItemDelelteBtn.classList.add('disabled-item')

        editingItem = itemss.firstElementChild;;
    
        todoInput.value = editingItem.innerText;
        Addalert(`You are Editing Now. buttons of editing item will be disabled `, 'blue')

    }
})



// select items 
select.addEventListener('click', (e) => {
   let todoItems = Array.from(todoContainer.children)
    todoItems.forEach(todo => {

        switch (e.target.value) {
            case 'all':
                if (todo.firstElementChild.classList.contains('checked')){
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'flex'
                }
                console.log('all')
                break;

            case 'completed':
                if (todo.firstElementChild.classList.contains('checked')){
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none'
                }
                console.log('completed')
                break;
    
            case 'uncompleted':
                if (!(todo.firstElementChild.classList.contains('checked'))){
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none'
                }
                console.log('completed')
                break;
        }
    });
})


// saving to localStorage
function SaveToLocal(todo){
    let todos;

    // Checking ---------> do i aleady have things in local storage
    if(localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}



// geting from localStorage 
function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

   todos.forEach(function(todo) {

    createNewTodo(todo)

   })
}

// remove todo from localStorage 
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.splice(todos.indexOf(todo), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}