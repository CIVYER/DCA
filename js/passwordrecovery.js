function showPass() {
  var x = document.getElementById("conpass");
  var y = document.getElementById("password");
  if (x.type === "password" || y.type == "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}


const password = document.getElementById('password');
const conpass = document.getElementById('conpass');
const pageToken = document.getElementById('pageToken');
const regForm = document.querySelector('.regForm');
const errors = document.getElementById('errors');
const email = document.getElementById('email');

const token = String(window.location.href).split("?token=")[1];
pageToken.value = token;

email.value = window.localStorage.getItem('email');

var errorList = []; 

password.addEventListener('keyup', (event)=>{
  checkPass();
});
conpass.addEventListener('keyup', (event)=>{
  checkPass();
});

function checkPass(){
  var password_ = password.value;
  var conpass_ = conpass.value;
  var pLenght = String(password_).trim().length;
  var cLenght = String(conpass_).trim().length;
  errors.innerHTML = "";
  
  
  //if pass == whiteSpace
  if(pLenght == 0){
    if(!(errorList.includes('error: space'))){
      errorList.push('error: space');
    }
    password.style.backgroundColor = "#C62313";
    errors.innerHTML = "Password cannot start with a Space";
  }
  else if(pLenght > 0){
    var index = errorList.indexOf('error: space');
    if(!(index == -1)){
      errorList.splice(index,1);
    }
    password.style.backgroundColor = "white";
    conpass.style.backgroundColor = "white";
    
    
    //if pass length is less than 6
    if(password_.length < 6){
      if(!(errorList.includes('error: passLength'))){
        errorList.push('error: passLength');
      }
      password.style.backgroundColor = "#C62313";
      errors.innerHTML = "Password Should be at least 6 characters";
    }
    else if(password_.length >= 6){
      var index = errorList.indexOf('error: passLength');
      if(!(index == -1)){
        errorList.splice(index,1);
      }
      password.style.backgroundColor = "white";
      conpass.style.backgroundColor = "white";


      //if password not equals to confirm password
      if(!(password_ == conpass_)){
        if(!(errorList.includes('error: pass'))){
          errorList.push('error: pass');
        }
        conpass.style.backgroundColor = "#C62313";
        errors.innerHTML = "Password does not match";
      }
      else if(password_ == conpass_){
        var index = errorList.indexOf('error: pass');
        if(!(index == -1)){
          errorList.splice(index,1);
        }
        password.style.backgroundColor = "white";
        conpass.style.backgroundColor = "white";
      }
    }
  }
  
}

regForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(regForm);

  if(!(errorList.length > 0)){
    fetch('http://localhost/dca/php/passwordrecovery.php' || '../php/passwordrecovery.php', {
      method: 'POST',
      body: formData
      }).then(response => response.text())
      .then(data =>{
        console.log(data);

        if(data == "success"){
          window.location = "../pages/login.html";
        }
        else if(data == "Invalid" || data == ""){
          errors.innerHTML = "Invalid Session";
          setTimeout(() => {
            window.location = "../pages/login.html";
          }, 1000);
        }

      });
  }



});
