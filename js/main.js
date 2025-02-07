let content = document.getElementById("tasks");
let addBtn = document.getElementById("add");
let tasks = []

function getTasksfromStorafe() {
    let retreveTasks =  tasksjson = JSON.parse(localStorage.getItem("tasks"))
    if (retreveTasks == null) {
        tasks = [] ;
    } else {
        tasks = retreveTasks ;
    }
}
getTasksfromStorafe()
function fillTasks() {

    content.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        content.innerHTML += `
                    <div class="box ${tasks[i].isDone ? 'Done' : ''} text ps-4 pe-2 py-1 ps-md-1">
                        <div class="row align-items-center ">
                            <div class="col-6 me-md5">
                                <h6 class="fw-bold">${tasks[i].title}</h6>
                                <span><i class="fa-solid fa-calendar-days"></i></span>
                                <span class="fw-bold time">${tasks[i].date}</span>
                            </div>
                            <div class="col-3 me-5 pe-md-5">
                                <div class="icon d-flex justify-content-between">
                                    <button onclick="deleteTask(${i})" class="circle delete text-light me-2 w-auto h-auto"><i class="fa-solid fa-trash"></i></button>
                                    ${tasks[i].isDone ? `
                                        <button onclick="cancel(${i})" class="circle cancel text-light me-2 w-auto h-auto"><i class="fa-solid fa-xmark"></i></button>
                                        ` : `
                                        <button onclick="done(${i})" class="circle done text-light me-2 w-auto h-auto"><i class="fa-solid fa-check"></i></button>
                                        `}
                                    
                                    <button onclick="updateTask(${i})" class="circle edit text-light me-2 w-auto h-auto"><i class="fa-solid fa-pen-to-square"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    }
}
fillTasks();

addBtn.addEventListener("click", function () {

    let now = new Date();
    let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear() + " | " + now.getHours() + ":" + now.getMinutes();


    let taskName = prompt("الرجاء ادخال عنوان المهمه");
    let taskobj = {
        title: taskName,
        date: date,
        isDone: false
    }
    tasks.push(taskobj);

    storetasks()

    fillTasks();
})

function deleteTask(index) {
    let Ask = confirm("هل انت متاكد من حذف : " + tasks[index].title);

    if (Ask) {
        tasks.splice(index, 1);
        fillTasks();
        storetasks()
    }
}

function updateTask(index) {
    let newName = prompt("الرجاء ادخال عنوان المهمه الجديد", tasks[index].title);
    if (newName.length > 0) {
        tasks[index].title = newName;
        fillTasks();
        storetasks()
    }

}

function done(index) {
    tasks[index].isDone = true;

    fillTasks();
    storetasks()
}   
function cancel(index) {
    tasks[index].isDone = false;

    fillTasks();
    storetasks()
}   

function storetasks() {
    let taskstring = JSON.stringify(tasks)
    localStorage.setItem("tasks" , taskstring)
}
