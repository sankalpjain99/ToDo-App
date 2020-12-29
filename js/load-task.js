// ********************************User Functions******************************** 

// Function to LogOut User 
logoutUser = (addon="") => {
    var queryString = "https://sankalp-task-manager-api.herokuapp.com/users/logout"
    if(addon==="All")
        queryString += "All"
    fetch(queryString,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then((res) => {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('usr-name');
            window.location.href = "../index.html";
        })
        .catch((err) => console.log(err))
}

// Function to Delete User 
deleteUser = () => {
    fetch("https://sankalp-task-manager-api.herokuapp.com/users/me",{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('usr-name');
            window.location.href = "../index.html";
        })
        .catch((err) => console.log(err))
}


// ********************************Task Functions******************************** 

// Function to Creat DIV element for task in DOM 
createTaskHTML = (element, toStike) =>{
    var newElement = document.createElement('div');
    var content = document.createElement('span');
    var updateBtn = document.createElement('span');
    var delBtn = document.createElement('span');

    content.className = "task-desc-span";
    content.textContent = element.description;

    delBtn.className = "del-btn";
    delBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";

    updateBtn.className = "update-btn";
    updateBtn.innerHTML = "<i class='fas fa-pen'></i>"

    newElement.className = "task";
    newElement.id = element._id;    

    newElement.appendChild(content);
    newElement.appendChild(updateBtn);
    newElement.appendChild(delBtn);
    if(toStike){
        newElement.classList.add("task-comp");
    }

    document.getElementById("task-container").prepend(newElement);
    updateBtn.addEventListener("click",() => {
        document.getElementById("update-task").style.display = "block";
        document.getElementById("task-desc-cancel").addEventListener("click", () => {
            document.getElementById("update-task").style.display = "none";
        })
        updateTask(updateBtn.parentElement.id);
    })
    delBtn.addEventListener("click", () => {
        delTask(delBtn.parentElement.id);
    })
    content.addEventListener("click", () => {
        var currCompleted = content.parentElement.classList.contains("task-comp");
        hideShowTask(currCompleted, content.parentElement.id);
        updateTask(content.parentElement.id, "yes", !currCompleted);
    })

}

hideShowTask = (completed, id) => {
    var currTaskDiv = document.getElementById(id);
    if(completed){
        currTaskDiv.classList.remove("task-comp");
        currTaskDiv.parentElement.prepend(currTaskDiv);
    }
    else{
        currTaskDiv.classList.add("task-comp");
        currTaskDiv.parentElement.append(currTaskDiv);
    }
}

// Function to Load Tasks in page 
loadTasks = () => {
    fetch("https://sankalp-task-manager-api.herokuapp.com/tasks",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    }).then((res) => res.json())
    .then((data) => {
        console.log(data)
        var tasks = data;
        tasks.forEach(element => {
            if(element.completed)
                createTaskHTML(element, element.completed);
        });
        tasks.forEach(element => {
            if(!(element.completed))
                createTaskHTML(element, element.completed);
        });
    })
    .catch((err) => console.log(err))
}

// Function to Add Task 
addTask = () => {
    var description = document.getElementById("desc").value;
    var completed = false;
    fetch("https://sankalp-task-manager-api.herokuapp.com/tasks",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({description: description, completed: completed})
    }).then((res) => res.json())
    .then((data) => {
        if(data.errors){
            throw new Error(data.message.split(":").pop());
        }else{
            createTaskHTML(data);
            document.getElementById("new-task").style.display = "none";
            document.getElementsByClassName("wrapper")[0].style.opacity = "1";
        }
    })
    .catch((err) => createAlert(err))    
}

// Function to Update Task 
updateTask = (id, byCompleted="", completed=false) => {
    if(byCompleted===""){
        document.getElementById("task-desc-update").addEventListener("click", () =>{
            var new_desc = document.getElementById("new-desc").value;
            fetch("https://sankalp-task-manager-api.herokuapp.com/tasks/"+id,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: JSON.stringify({description: new_desc})
            }).then((res) => res.json())
            .then((data) => {
                if(data.errors){
                    throw new Error(data.message.split(":").pop());
                } else{
                    document.getElementById("update-task").style.display = "none";
                    document.getElementById(id).childNodes[0].textContent = new_desc;
                }
            })
            .catch((err) => createAlert(err))  
        })
    }
    else{
        fetch("https://sankalp-task-manager-api.herokuapp.com/tasks/"+id,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: JSON.stringify({completed: completed})
            }).then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err))
    }
}

// Function to Delete Task 
delTask = (id) => {
    document.getElementById(id).remove();
    fetch("https://sankalp-task-manager-api.herokuapp.com/tasks/"+id,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.log(err))
}


// *****************************************Onload Fuction Calls******************************** 

// Onload Function to add Event Listeners 
window.onload = () => {
    if(localStorage.getItem("token")===null){
        window.location.href = "./index.html"
    }
    else{
        // Load Name and Tasks 
        loadTasks();
        document.getElementsByClassName("usr-name")[0].textContent = " " + window.localStorage.getItem('usr-name');

        // DropDown Options 
        document.getElementById("logout").addEventListener("click", logoutUser);
        document.getElementById("logout-all").addEventListener("click", ()=>{
            logoutUser("All");
        });
        document.getElementById("update-usr").addEventListener("click", () => {
            window.location.href = "../profile.html";
        })
        document.getElementById("delete-usr").addEventListener("click", deleteUser);

        // For new Tasks 
        document.getElementById("plus-icon").addEventListener("click", () => {
            document.getElementById("new-task").style.display = "block";
            document.getElementsByClassName("wrapper")[0].style.opacity = "0.3";
            document.getElementById("add-task").addEventListener("click", addTask);
            document.getElementById("cancel-task").addEventListener("click", () => {
                document.getElementById("new-task").style.display = "none";
                document.getElementsByClassName("wrapper")[0].style.opacity = "1";
            })
        });
    }
}