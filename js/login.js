const regForm = document.querySelector(".regForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const errorBox = document.querySelector("#errorBox");
const fgPass = document.getElementById("fgPass");
const noAcc = document.getElementById("noAcc");

window.localStorage.clear();


regForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    fgPass.style.visibility = "hidden";
    const formData = new FormData(regForm);
    fetch("http://localhost/dca/php/login.php" ||"../php/login.php",{
                method: 'POST',
                body: formData
            }).then(response => response.text())
            .then(data =>{
                console.log(data);

                if(data == "Logged In"){
                    window.location = "../pages/menuhtml.html";
                }

                if(data == "Wrong Password"){
                    errorBox.innerHTML = "Wrong Password";
                    setTimeout(() => {
                        errorBox.innerHTML = "";
                    }, 5000);
                    fgPass.style.visibility = "visible";
                }
                else if(data == "Account Does Not Exist!"){
                    errorBox.innerHTML = "Account Does Not Exist!";
                    setTimeout(() => {
                        errorBox.innerHTML = "";
                    }, 5000);
                }

            });
});



