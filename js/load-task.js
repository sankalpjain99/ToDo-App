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
            var newElement = document.createElement('div');
            var content = document.createElement('span');
            var updateBtn = document.createElement('button');
            var delBtn = document.createElement('button');

            content.className = "task-desc-span";
            content.textContent = element.description;

            delBtn.className = "del-btn";
            delBtn.textContent = "Delete Task";

            updateBtn.className = "update-btn";
            updateBtn.textContent = "Edit"

            newElement.className = "task";
            newElement.id = element._id;

            newElement.appendChild(content);
            newElement.appendChild(updateBtn);
            newElement.appendChild(delBtn);

            document.getElementById("task-container").appendChild(newElement);
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
    var completed = (document.getElementById("completed").checked)?true:false;
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
        var newElement = document.createElement('div');
        var content = document.createElement('span');
        var updateBtn = document.createElement('button');
        var delBtn = document.createElement('button');

        content.className = "task-desc-span";
        content.textContent = data.description;

        delBtn.className = "del-btn";
        delBtn.textContent = "Delete Task";

        updateBtn.className = "update-btn";
        updateBtn.textContent = "Edit"

        newElement.className = "task";
        newElement.id = data._id;

        newElement.appendChild(content);
        newElement.appendChild(updateBtn);
        newElement.appendChild(delBtn);
        
        document.getElementById("task-container").appendChild(newElement);
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
    });
}