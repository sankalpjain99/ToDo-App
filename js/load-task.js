createTaskHTML = (element) =>{
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

    document.getElementById("task-container").appendChild(newElement);
}


updateName = () => {
    fetch("https://sankalp-task-manager-api.herokuapp.com/users/me",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    }).then((res) => res.json())
    .then((data) => {
        document.getElementsByClassName("usr-name")[0].textContent = " "+data.name;
    })
    .catch((err) => console.log(err))
}

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
            createTaskHTML(element);
        });
    })
    .catch((err) => console.log(err))
}

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
            window.location.href = "../index.html";
        })
        .catch((err) => console.log(err))
}

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
            window.location.href = "../index.html";
        })
        .catch((err) => console.log(err))
}

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
        console.log(data);
        createTaskHTML(data);
        document.getElementById("new-task").style.display = "none"
    })
    .catch((err) => console.log(err))    
}

window.onload = () => {
    updateName();
    loadTasks();    
    document.getElementById("logout").addEventListener("click", logoutUser);
    document.getElementById("logout-all").addEventListener("click", ()=>{
        logoutUser("All");
    });
    document.getElementById("delete-usr").addEventListener("click", deleteUser);
    document.getElementById("create-task").addEventListener("click", () => {
        document.getElementById("new-task").style.display = "block";
        document.getElementById("add-task").addEventListener("click", addTask);
        document.getElementById("cancel-task").addEventListener("click", () => {
            document.getElementById("new-task").style.display = "none";
        })
    });
}