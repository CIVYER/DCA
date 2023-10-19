// adds and removes option to the course select depending on the dept/track

const dept_track = document.querySelector("#dept");
const course = document.querySelector("#course");
const lbl_courseStrand = document.querySelector("#courseStrand");


function add_option(){
    const cea = [
        "Bachelor of Science in Architecture",
        "Bachelor of Science in Civil Engineering",
        "Bachelor of Science in Mechanical Engineering",
        "Bachelor of Science in Electrical Engineering",
        "Bachelor of Science in Electronics Engineering",
        "Bachelor of Science in Industrial Engineering",
        "Bachelor of Science in Computer Engineering"
    ];

    const cbs = [
        "Bachelor of Science in Business Administration",
        "Bachelor of Science in Entrepreneurship",
        "Bachelor of Science in Accountancy",
        "Bachelor of Science in Accounting Information Systems",
        "Bachelor in Public Administration"
    ];

    const cas = [
        "Bachelor of Science in Environmental Science",
        "Bachelor of Science in Biology"
    ];

    const chtm = [
        "Bachelor of Science in Hotel and Restaurant Management",
        "Bachelor of Science in Hospitality Management",
        "Bachelor of Science in Tourism Management"
    ];
    
    const cssp = [
    "Bachelor of Science in Social Work",
    "Bachelor of Science in Psychology",
    "Bachelor of Science in Sociology"
    ];
    
    const coe = [
        "Bachelor of Elementary Education",
        "Bachelor of Secondary Education",
        "Bachelor in Physical Education",
        "Bachelor in Technical and Livelihood Education",
        "Bachelor in Technical-Vocational Teacher Education"
    ];

    const ccs = [
    "Bachelor of Science in Information Technology",
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Information Systems",
    "Associate in Computer Technology"
    ];

    const cit = [
        "Bachelor of Science in Industrial Technology"
    ];

    const sha = [
        "ABM",
        "HUMSS",
        "STEM"
    ];
    const sht = [
        "Home Economics",
        "Industrial Arts"
    ];
    
    course.innerHTML = "";

      let option = document.createElement("option");
      option.value = "---";
      option.text = "---";
      course.add(option);
      
    if (dept_track.value == "COLLEGE OF ENGINEERING AND ARCHITECTURE"){
        for (let i = 0; i < cea.length; i++) {
        let option = document.createElement("option");
        option.value = cea[i];
        option.text = cea[i];
        course.add(option);
        }
    }
    else if (dept_track.value == "COLLEGE OF BUSINESS STUDIES"){
        for (let i = 0; i < cbs.length; i++) {
        let option = document.createElement("option");
        option.value = cbs[i];
        option.text = cbs[i];
        course.add(option);
        }
    }
    else if (dept_track.value == "COLLEGE OF ARTS AND SCIENCES"){
        for (let i = 0; i < cas.length; i++) {
        let option = document.createElement("option");
        option.value = cas[i];
        option.text = cas[i];
        course.add(option);
        }
    }
    else if (dept_track.value == "COLLEGE OF HOSPITALITY MANAGEMENT"){
        for (let i = 0; i < chtm.length; i++) {
        let option = document.createElement("option");
        option.value = chtm[i];
        option.text = chtm[i];
        course.add(option);
        }
    }
    else if (dept_track.value == "COLLEGE OF SOCIAL SCIENCES AND PHILOSOPHY"){
        for (let i = 0; i < cssp.length; i++) {
        let option = document.createElement("option");
        option.value = cssp[i];
        option.text = cssp[i];
        course.add(option);
        }
    }
    else if (dept_track.value == "COLLEGE OF EDUCATION"){
        for (let i = 0; i < coe.length; i++) {
        let option = document.createElement("option");
        option.value = coe[i];
        option.text = coe[i];
        course.add(option);
        }
    }
    else if (dept_track.value == "COLLEGE OF COMPUTING STUDIES"){
        for (let i = 0; i < ccs.length; i++) {
        let option = document.createElement("option");
        option.value = ccs[i];
        option.text = ccs[i];
        course.add(option);
        }
    }
    else if (dept_track.value == "COLLEGE OF INDUSTRIAL TECHNOLOGY"){
        for (let i = 0; i < cit.length; i++) {
        let option = document.createElement("option");
        option.value = cit[i];
        option.text = cit[i];
        course.add(option);
        }
    }
    else if (dept_track.value == "SENIOR HIGH SCHOOL: ACADEMIC TRACK"){
        for (let i = 0; i < sha.length; i++) {
        let option = document.createElement("option");
        option.value = sha[i];
        option.text = sha[i];
        course.add(option);
        }
    }
    else if (dept_track.value == "SENIOR HIGH SCHOOL: TECHNICAL VOCATIONAL LIVELIHOOD TRACK"){
        for (let i = 0; i < sht.length; i++) {
        let option = document.createElement("option");
        option.value = sht[i];
        option.text = sht[i];
        course.add(option);
        }
    }
    if (dept_track.value == "LABORATORY HIGH SCHOOL"){
        course.hidden = true;
        lbl_courseStrand.hidden = true;
    }
    else{
        course.hidden = false;
        lbl_courseStrand.hidden = false;
    }
    if(dept_track.value != "---"){
        dept_track.style.backgroundColor = "white";
    }
}

dept_track.addEventListener("click", ()=>{
    dept_track.style.backgroundColor = "white";
});
course.addEventListener("click", ()=>{
    course.style.backgroundColor = "white";
});

function turnWhite(){
    if(course.value != "---"){
        course.style.backgroundColor = "white";
    }
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// registration form data handling and validation/////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//INPUT ELEMENTS//////////////////////////////////////
//////////////////////////////////////////////////////
const regForm = document.querySelector(".regForm");
const inputs = document.getElementsByTagName("input");
const regpass = document.querySelector("#password");
const conpass = document.querySelector("#confirm_password");
const btnSubmit = document.getElementById("btnSubmit");
const email = document.getElementById("email");
//////////////////////////////////////////////////////
//error outputs element
//////////////////////////////////////////////////////
const accExists = document.getElementById("accExists");
const passLengthError = document.getElementById("passLengthError");
const studNoError = document.getElementById("studNoError");
const emailError = document.getElementById("emailError");
const conpassError = document.getElementsByClassName("conpassError");
const studnoemailError = document.getElementById("studnoemailError")
const studentno = document.getElementById("studentno")
//////////////////////////////////////////////////////
//error list
//////////////////////////////////////////////////////
let error_list = [];
let fullNameError_list = [];




function redInput(){
    for (let i = 0; i < inputs.length-1; i++) {
        const element = inputs[i];
        if(String(element.value).trim().length === 0){
            element.style.backgroundColor = "#C62313";
        }
        else{
            if(!(element.id == 'password' || element.id == "confirm_password")){
                element.style.backgroundColor = "white";
            }
        }
    }
}


//////////////////////////////////////////////////////
//if input is blank or spaces = not valid input == red box == error
//////////////////////////////////////////////////////

/**

        if(!(error_list.includes("error: pass"))){
            error_list.push("error: pass");                         ===     adds error to the list if error does not exist yet
        }


        let index = error_list.indexOf("error: "+element.id);               if error is resolved, returns the index of error in list
        if(index >= 0){                                             ===     if error is in list and is resolved remove it from the list
            error_list.splice(index,1);
        }



*/
 ////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////

for (let i = 0; i < inputs.length-1; i++) {
    const element = inputs[i];

    // element.autocomplete = "off";

    element.addEventListener("keyup",()=>{
        
        console.log(element.id)
        
        if(element.id == 'password' || element.id == "confirm_password"){
            if(conpass.value != regpass.value || String(element.value).trim().length === 0 || String(element.value).trim().length < 6){
                
                //if password is less than 6 characters = error
                if (String(element.value).trim().length < 6 && element.id == 'password') {
                    passLengthError.innerHTML = "Password: Must have atlest 6 characters";                    
                }
                else if (String(element.value).trim().length >= 6 && element.id == 'password') {
                    passLengthError.innerHTML = "";                    
                }

                //if password and confirm password does not match = error
                if (conpass.value == regpass.value) {
                    conpassError[0].innerHTML = "";                    
                    conpassError[1].innerHTML = "";                    
                }
                else{
                    conpassError[0].innerHTML = "Your password does not match!!";
                    conpassError[1].innerHTML = "Your password does not match!!";
                }
                regpass.style.backgroundColor = "#C62313";
                conpass.style.backgroundColor = "#C62313";
                if(!(error_list.includes("error: pass"))){
                    error_list.push("error: pass");
                }
            }
            //else if there is no error found on password
            else{
                conpassError[0].innerHTML = "";                    
                conpassError[1].innerHTML = "";                    
                regpass.style.backgroundColor = "#1CDD40";
                conpass.style.backgroundColor = "#1CDD40";
                error_list.splice(error_list.indexOf("error: pass"),1);
            }
        }
        // checks if only white space is entered red box == error
        else if(String(element.value).trim().length === 0){
            element.style.backgroundColor = "#C62313";
            if(!(error_list.includes("error: "+element.id))){
                error_list.push("error: "+element.id);
            }
        }
        else{
            element.style.backgroundColor = "white";
            let index = error_list.indexOf("error: "+element.id);
            if(index >= 0){
                error_list.splice(index,1);
            }
        }

        //////////////////////////////////////////////////////
        // validation manual
        //////////////////////////////////////////////////////
        
        
        
        if(element.id == "studentno"){
            if(String(element.value).trim().length != 10){
                studNoError.innerHTML = "Must be 10 digits long";
                element.style.backgroundColor = "#C62313";
                if(!(error_list.includes("error: studentno"))){
                    error_list.push("error: studentno")
                }
            }
            else{
                studNoError.innerHTML = "";
                element.style.backgroundColor = "white";
                let index = error_list.indexOf("error: studentno");
                if(index >= 0){
                    error_list.splice(index,1);
                }
            }
        }
        
        if(element.id == "email"){
            if(!(String(element.value).toLowerCase().includes("@dhvsu.edu.ph".toLowerCase()))){
                emailError.innerHTML = "Not a valid dhvsu email"
                element.style.backgroundColor = "#C62313";
                if(!(error_list.includes("error: email"))){
                    error_list.push("error: email");
                }
            }
            else{
                emailError.innerHTML = ""
                element.style.backgroundColor = "white";
                let index = error_list.indexOf("error: email");
                if(index >= 0){
                    error_list.splice(index,1);
                }
            }
        }
        
        if(element.id == "studentno" || element.id == "email"){
            let email_studno = String(email.value).split("@")[0];
            if(studentno.value != email_studno){
                studnoemailError.innerHTML = "StudentNo. Does not match Email StudentNo.";
                studentno.style.backgroundColor = "#C62313";
                if(!(error_list.includes("error: emailstudentno"))){
                    error_list.push("error: emailstudentno")
                }
            }
            else{
                studnoemailError.innerHTML = "";
                studentno.style.backgroundColor = "white";
                let index = error_list.indexOf("error: emailstudentno");
                if(index >= 0){
                    error_list.splice(index,1);
                }
            }
        }
    });
    
}



regForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    accExists.innerHTML = "";
    
    if(dept_track.value == "---"){
        dept_track.style.backgroundColor = "#C62313";
        course.style.backgroundColor = "#C62313";
        if(!(error_list.includes("error: track"))){
            error_list.push("error: track");
        }
    }
    else if(dept_track.value != "---" && dept_track.value != "LABORATORY HIGH SCHOOL"){
        let index = error_list.indexOf("error: track");
        if(index >= 0){
            error_list.splice(index,1);
        }
        dept_track.style.backgroundColor = "white";
        if(course.value == "---"){
            course.style.backgroundColor = "#C62313";
        if(!(error_list.includes("error: course"))){
            error_list.push("error: course");
        }
        }
        else{
            course.style.backgroundColor = "white";
            let index = error_list.indexOf("error: course");
            if(index >= 0){
                error_list.splice(index,1);
            }
        }
    }
    else{
        let index = error_list.indexOf("error: track");
        if(index >= 0){
            error_list.splice(index,1);
        }
        dept_track.style.backgroundColor = "white";
    }
    for (let i = 0; i < inputs.length-1; i++) {
        const element = inputs[i];
        if(String(element.value).trim().length === 0){
            element.style.backgroundColor = "#C62313";
        if(!(error_list.includes("error"))){
            error_list.push("error");
        }
            redInput();
            break;
        }
        else{
            if(!(element.id == 'password' || element.id == "confirm_password")){
                element.style.backgroundColor = "white";
            }
        }
    }

//////////////////////////////////////////////////////
//if the form is valid, data is submitted/////////////    
//////////////////////////////////////////////////////

    if(error_list.length == 0){
        const formData = new FormData(regForm);
        fetch("http://localhost/dca/php/reg.php" ||"../php/reg.php",{
            method: 'POST',
            body: formData
        }).then(response => response.text())
        .then(data =>{
            if(data != "succesfully Inserted!!"){
                // if there is an error, will alert user of the error
                console.log(data);
                accExists.innerHTML = "Account Already Exists!!";
                accExists.style.color = "#C62313";
            }
            else{
                console.log("SUCCESSFUL!!");
                accExists.innerHTML = "Account Created Successfully!!";
                accExists.style.color = "#1CDD40";
                setTimeout(() => {
                    window.location = '../pages/login.html';
                }, 1000);
            }
        });
    }
    else{
        console.log("Not yet validated!!");
    }
});


(function () {
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
})();
