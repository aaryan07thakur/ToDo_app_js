document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks=JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks && Array.isArray(storedTasks)){
        tasks= storedTasks;  // directly assign to global array
        updateState();
        updateTasksList();
    }
});

let tasks=[];

// save task in local storage
const saveTasks=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
};

// task add 
const addTask=()=>{
    const taskInput=document.getElementById('taskInput')
    const text= taskInput.value.trim()

    if(text){
        tasks.push({text: text, completed:false});
        taskInput.value="";
        updateTasksList();
        updateState();
        saveTasks();
    }
    // console.log(tasks);

};
// task complete vayo ani check gayo vnae ture print hun x if not false
const toggleTastComplete= (index)=>{
    tasks[index].completed=!tasks[index].completed;
    updateTasksList();
    updateState();
    saveTasks();
    // console.log({tasks})
};
//delete task
const deleteTasK=(index)=>{
    tasks.splice(index,1);
    updateTasksList();
    updateState();
    saveTasks();
};

//edit task
const editTask=(index)=>{
    const taskInputs =document.getElementById("taskInput");
    taskInputs.value=tasks[index].text

    tasks.splice(index,1);
    updateTasksList();
    updateState();
    saveTasks();
};

//update progress bar
const updateState=()=>{
    const completeTasks=tasks.filter(task=> task.completed).length;
    const totalTasks= tasks.length;
    const progress=(completeTasks/totalTasks)* 100;

    const progressBar= document.getElementById("progress")
    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText=`${completeTasks}/ ${totalTasks}`;

    if(tasks.length && completeTasks=== totalTasks){
        blaskConfetti();
    }

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
    saveTasks();  // keep storage always updated
};

document.getElementById("newTask").addEventListener('click',function(e){
    e.preventDefault()

    addTask();
});

const blaskConfetti =()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}