// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// function to LOad all event listeners

loadEventListeners();

// function 
function loadEventListeners() {
    // DOM Load Event 
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event 
    form.addEventListener('submit', addTask);
    // Remove task Event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click',clearTasks);
    //filter Tasks
    filter.addEventListener('keyUp', filterTasks);

}
// Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';

        // create text-node and append to the Li
        li.appendChild(document.createTextNode(task));

        // Create new link elemtn 
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //add icon tml TASKS
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to the li
        li.appendChild(link);

        //append li to the ul
        // console.log(li);
        taskList.appendChild(li);

    })

} 


//Add task function 

function addTask(e) {
    if(taskInput.value === '') {
    alert('Add a task');    
    }

    // create element

    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';

    // create text-node and append to the Li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link elemtn 
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //add icon tml TASKS
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to the li
    li.appendChild(link);

    //append li to the ul
    // console.log(li);
    taskList.appendChild(li);

    // Store in local storage;
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();

}
// store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// RemoveTask function 
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }    
    }  
}

// Remove from Ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });
    localStorage.setITem('tasks', JSON.stringify(tasks));

}

//clear Tasks
function clearTasks(){
    // taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Faster
    //clear from LS
clearTasksFromLocalStorage();

}
//clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();

}

//filterTasks
function filterTasks(e){
    const text = e.target.value.toLowercase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}