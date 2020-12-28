
fetchDetails = () => {
    fetch("https://sankalp-task-manager-api.herokuapp.com/users/me",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.getElementsByTagName("h1").textContent = data.name;
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