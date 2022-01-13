// let taskList = [
//     {
//         name:"Email David",
//         checked: true
//     },
//     {
//         name:"Create ideal user persona guide",
//         checked: true
//     },
//     {
//         name:"Set up A/B test",
//         checked: true
//     }
// ]
// localStorage.setItem("tasks", JSON.stringify(taskList));
load();
function load() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let taskListKey of taskList) {
        addTask(taskListKey.name, taskListKey.checked);
    }
}



document.getElementById("add-task-button").addEventListener("click", function () {
    let addTodoField = document.querySelector("#input-task");
    addTask(addTodoField.value, false);
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.push({
        name: addTodoField.value,
        checked: false
    })
    localStorage.setItem("tasks", JSON.stringify(taskList));
    addTodoField.value = null;
})

function addTask(taskName, checked) {
    let tasks = document.querySelector("#task-list");
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick", "onCheck(this);")
    if(checked === true)
        checkbox.setAttribute("checked", checked);
    let span = document.createElement("span");
    span.setAttribute("class", "task");
    span.innerText = taskName;
    let button = document.createElement("button");
    button.setAttribute("class", "delete-btn");
    button.setAttribute("onclick", "deleteTask(this)")
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    tasks.appendChild(li);
}

function deleteTask(obj){
    let taskBlock = obj.parentNode;
    let taskName = taskBlock.querySelector("span").innerText;
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = taskList.find(item => item.name === taskName);
    const index = taskList.indexOf(task);
    if (index > -1) {
        taskList.splice(index, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
    taskBlock.remove();
}

function onCheck(obj) {
    let taskBlock = obj.parentNode;
    let taskName = taskBlock.querySelector("span").innerText;
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = taskList.find(item => item.name === taskName);
    task.checked = obj.checked;
    localStorage.setItem("tasks", JSON.stringify(taskList));
}
