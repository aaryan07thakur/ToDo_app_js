let tasks=[];
// task add 
const addTask=()=>{
    const taskInput=document.getElementById('taskInput')
    const text= taskInput.value.trim()

    if(text){
        tasks.push({text: text, completed:false});
        taskInput.value="";
        updateTasksList();
        updateState();
    }
    // console.log(tasks);

};
// task complete vayo ani check gayo vnae ture print hun x if not false
const toggleTastComplete= (index)=>{
    tasks[index].completed=!tasks[index].completed;
    updateTasksList();
    updateState();
    // console.log({tasks})
};
//delete task
const deleteTasK=(index)=>{
    tasks.splice(index,1);
    updateTasksList();
    updateState();
};

//edit task
const editTask=(index)=>{
    const taskInputs =document.getElementById("taskInput");
    taskInputs.value=tasks[index].text

    tasks.splice(index,1);
    updateTasksList();
    updateState();
};

//update progress bar
const updateState=()=>{
    const completeTasks=tasks.filter(task=> task.completed).length;
    const totalTasks= tasks.length;
    const progress=(completeTasks/totalTasks)* 100;

    const progressBar= document.getElementById("progress")
    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText=`${completeTasks}/ ${totalTasks}`

};


const updateTasksList=()=>{
    const taskList=document.getElementById('task-list')
    taskList.innerHTML="";

    tasks.forEach((task,index) => {
        const listItem=document.createElement('li')

        listItem.innerHTML=`
        <div class="taskItem">
            <div class="task ${task.completed ? "completed":" "}">
              <input type="checkbox" class="checkbox" 
              ${task.completed ? "checked" :""}/>
              <p> ${task.text}</P>
            </div>
            <div class="icons">
                <img src="./img/bin.png" onClick="deleteTasK(${index})" />
                <img src="./img/edit.png" onClick="editTask(${index})" />

                
            </div>
        </div>
        `;

        listItem.addEventListener("change",()=> toggleTastComplete(index));
        taskList.append(listItem);
        
    });
}

document.getElementById("newTask").addEventListener('click',function(e){
    e.preventDefault()

    addTask();
})