document.getElementById("signup-btn").addEventListener("click", () => {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    fetch("https://sankalp-task-manager-api.herokuapp.com/users",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, age: age, email: email, password:password})
    }).then((res) => res.json())
    .then((data) => {
        if(data.errors){
            throw new Error(data.message.split(":").pop());
        }
        else{
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('usr-name', data.user.name);
            window.location.href = "./tasks.html";
        }
    })
    .catch((err) => createAlert(err))
})