
fetchDetails = () => {
    fetch("https://sankalp-task-manager-api.herokuapp.com/users/me",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then((res) => res.json())
        .then((data) => {
            document.getElementsByTagName("h1")[0].textContent = data.name;
            if(data.age !== 0)
                document.getElementById("age").textContent = data.age;
            document.getElementById("email").textContent = data.email;
            document.getElementById("new-name").value = data.name;
            if(data.age !== 0)
                document.getElementById("new-age").value = data.age;
            document.getElementById("new-email").value = data.email;
        })
        .catch((err) => console.log(err))
}

updateProfile = () => {
    var currName = document.getElementsByTagName("h1")[0].textContent;
    var currAge = document.getElementById("age").textContent;
    var currEmail = document.getElementById("email").textContent;
    var newName = document.getElementById("new-name").value;
    var newAge = document.getElementById("new-age").value;
    var newEmail = document.getElementById("new-email").value;
    var pass = document.getElementById("pass").value;
    var rePass = document.getElementById("re-pass").value;
    var updateObj = {}
    if(currName !== newName){
        updateObj.name = newName;
    }
    if(currAge !== newAge){
        updateObj.age = newAge;
    }
    if(currEmail !== newEmail){
        updateObj.email = newEmail;
    }
    if(pass!==""){
        if(pass===rePass){
            updateObj.password = pass;
        }else{
            return createAlert("Password does not match");
        }
    }
    if(Object.keys(updateObj).length){

        fetch("https://sankalp-task-manager-api.herokuapp.com/users/me",{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: JSON.stringify(updateObj)
            }).then((res) => res.json())
            .then((data) => {
                if(data.errors){
                    throw new Error(data.message.split(":").pop());
                } else{
                    Object.keys(updateObj).forEach(key => {
                        if(key!=="password"){
                            if(key==="name"){
                                document.getElementsByTagName("h1")[0].textContent = updateObj[key];
                                window.localStorage.setItem("usr-name", updateObj[key]);
                            }
                            else
                                document.getElementById(key).textContent = updateObj[key];
                        }
                    })
                    document.getElementById("new-profile").style.display = "none";
                    document.getElementsByClassName("wrapper")[0].style.opacity = "1";
                }
            })
            .catch((err) => createAlert(err))

    } else{
        document.getElementById("new-profile").style.display = "none";
        document.getElementsByClassName("wrapper")[0].style.opacity = "1";
    }   
}


window.onload = () => {
    fetchDetails();
    document.getElementById("edit-pfl").addEventListener("click",() => {
        document.getElementById("new-profile").style.display = "block";
        document.getElementsByClassName("wrapper")[0].style.opacity = "0";
        document.getElementById("upd-btn").addEventListener("click", updateProfile);
        document.getElementById("cancel-btn").addEventListener("click", () => {
            document.getElementById("new-profile").style.display = "none";
            document.getElementsByClassName("wrapper")[0].style.opacity = "1";
        })
    })
}