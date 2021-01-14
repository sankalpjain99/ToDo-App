window.onload = () => {
    if(!(localStorage.getItem("token")===null)){
        window.location.href = "./tasks.html"
    }
    else{
        document.getElementsByClassName("main-box")[0].style.opacity = "1";
        document.getElementById("login-btn").addEventListener("click" , () => {
            var email = document.getElementById("email").value;
            var password = document.getElementById("pass").value;
            if(email==="")
                return createAlert("Email is Required");
            if(password==="")
                return createAlert("Password is Required");
            document.getElementsByClassName("main-box")[0].style.opacity = "0";
            fetch("https://sankalp-task-manager-api.herokuapp.com/users/login",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password:password})
            }).then((res) => {
                if(res.status === 400){
                    document.getElementsByClassName("main-box")[0].style.opacity = "1";
                    throw new Error("Invalid Email or Password");
                }else{
                    return res.json();
                }
            })
            .then((data) => {
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('usr-name', data.user.name);
                window.location.href = "./tasks.html"
            })
            .catch((err) => createAlert(err))
        })

        document.getElementById("sign-btn").addEventListener("click", () => {
            window.location.href = "./signup.html";
        })
    }
}
