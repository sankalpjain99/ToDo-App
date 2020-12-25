document.getElementById("login-btn").addEventListener("click" , () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    console.log(email+" "+password);
    fetch("https://sankalp-task-manager-api.herokuapp.com/users/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password:password})
    }).then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.localStorage.setItem('token', data.token)
    })
    .catch((err) => console.log(err))
})

document.getElementById('get-user').addEventListener('click', () => {
    fetch("https://sankalp-task-manager-api.herokuapp.com/users/me",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    }).then((res) => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch((err) => console.log(err))
})