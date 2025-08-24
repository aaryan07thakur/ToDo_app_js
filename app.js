let tasks=[];
// task add 
const addTask=()=>{
    const taskInput=document.getElementById('taskInput')
    const text= taskInput.value.trim()

    if(text){
        tasks.push({text: text, completed:false});
        taskInput.value="";
        updateTasksList();
    }
    // console.log(tasks);

};
// task complete vayo ani check gayo vnae ture print hun x if not false
const toggleTastComplete= (index)=>{
    tasks[index].completed=!tasks[index].completed;
    updateTasksList();
    // console.log({tasks})
};
//delete task
const deleteTasK=(index)=>{
    tasks.splice(index,1);
    updateTasksList();
};

//edit task
const editTask=(index)=>{
    const taskInputs =document.getElementById("taskInput");
    taskInputs.value=tasks[index].text

    tasks.splice(index,1);
    updateTasksList();

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