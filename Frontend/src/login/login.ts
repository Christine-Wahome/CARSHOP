
let loginBtn = document.getElementById("login-btn")! as HTMLButtonElement;
let LoginForm = document.getElementById("loginForm")! as HTMLDivElement;


loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let userName = document.getElementById("userName")! as HTMLInputElement;
    let password = document.getElementById("password")! as HTMLInputElement;
    
   if (userName.value === "" || password.value === "") {

        let error = document.createElement("p");
        error.innerHTML = "Please fill all fields";
        error.style.color = "red";
        error.style.fontSize = "12px";
        LoginForm.appendChild(error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    }else{
        let authData = await login(userName.value, password.value);
        if (authData) {
            let user = authData['user']
            let token = authData['token']
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            if (user.is_admin === true) {
                window.location.href = "../Admin/admin.html";
            } else {
            window.location.href = "../Home/index.html";
            }
        }
    }

   

});



const login = async (userName: string, password: string) => {
    let response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        body: JSON.stringify({
            userName,
            password
        }),
        headers: {
            "content-type": "application/json"
        }
    });
    
    if (response.status === 401) {
        let error = document.createElement("p");
        error.innerHTML = "Invalid userName or password";
        error.style.color = "red";
        error.style.fontSize = "12px";
        LoginForm.appendChild(error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    } else if (response.status === 200) {
        return await response.json();
    } else {
        
        let error = document.createElement("p");
        error.innerHTML = "An error occured";
        error.style.color = "red";
        error.style.fontSize = "12px";
        LoginForm.appendChild(error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    }
    }


