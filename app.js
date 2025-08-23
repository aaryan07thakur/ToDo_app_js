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
    console.log(tasks);

};

const updateTasksList=()=>{
    const taskList=document.getElementById('task-list')
    taskList.innerHTML="";

    tasks.forEach((task,index) => {
        const listItem=document.createElement('li')

        listItem.innerHTML=`
        <div class="taskItem">
            <div class="task ${task.completed ? "Completed":" "}">
              <input type="checkbox" class="checkbox" 
              ${task.completed ? "checked" :""}/>
              <p> ${task.text}</P>
            </div>
            <div class="icons">
                <img src="./img/bin.png" onClick="deleteTasK(${index})" />
                <img src="./img/edit.png" onClick="editTasK(${index})" />
            </div>
        </div>
        `;

        listItem.addEventListener("change",()=> toggleTastComplete(index));
        taskList.append(listItem);
        
    });
}

document.getElementById("newTak").addEventListener('click',function(e){
    e.preventDefault()

    addTask();
})