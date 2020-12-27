window.onload = () => {
    if(!(localStorage.getItem("token")===null)){
        window.location.href = "./tasks.html"
    }
    else{
        document.getElementById("login-btn").addEventListener("click" , () => {
            var email = document.getElementById("email").value;
            var password = document.getElementById("pass").value;
            if(email==="")
                return alert("Email is Required");
            if(password==="")
                return alert("Password is Required");   
            fetch("https://sankalp-task-manager-api.herokuapp.com/users/login",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password:password})
            }).then((res) => {
                if(res.status === 400){
                    throw new Error("Invalid Email or Password");
                }else{
                    return res.json();
                }
            })
            .then((data) => {
                window.localStorage.setItem('token', data.token);
                window.location.href = "./tasks.html"
            })
            .catch((err) => alert(err))
        })

        document.getElementById("sign-btn").addEventListener("click", () => {
            window.location.href = "./signup.html";
        })
    }
}
