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
    //add task event 
    form.addEventListener('submit', addTask);
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

    //clear input
    taskInput.value = '';

    


    e.preventDefault();

}