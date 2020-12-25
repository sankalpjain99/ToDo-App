document.getElementById("signup-btn").addEventListener("click", () => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    fetch("https://sankalp-task-manager-api.herokuapp.com/users",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, email: email, password:password})
    }).then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.localStorage.setItem('token', data.token)
    })
    .catch((err) => console.log(err))
})