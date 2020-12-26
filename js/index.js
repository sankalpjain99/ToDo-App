window.onload = () => {
    if(!(localStorage.getItem("token")===null)){
        window.location.href = "./tasks.html"
    }
    else{
        document.getElementById("login-btn").addEventListener("click" , () => {
            var email = document.getElementById("email").value;
            var password = document.getElementById("pass").value;
            fetch("https://sankalp-task-manager-api.herokuapp.com/users/login",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password:password})
            }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                window.localStorage.setItem('token', data.token);
                window.location.href = "./tasks.html"
            })
            .catch((err) => console.log(err))
        })
        document.getElementById("sign-btn").addEventListener("click", () => {
            window.location.href = "./signup.html";
        })
    }
}
