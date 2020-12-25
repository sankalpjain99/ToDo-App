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
            newElement.className = "task";
            newElement.innerHTML = element.description;
            document.getElementById("task-container").appendChild(newElement);
        });
    })
    .catch((err) => console.log(err))
}

logoutUser = () => {
    fetch("https://sankalp-task-manager-api.herokuapp.com/users/logout",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
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

window.onload = () => {
    updateName();
    loadTasks();    
    document.getElementById("logout").addEventListener("click", logoutUser);
    document.getElementById("delete-usr").addEventListener("click", deleteUser);
}