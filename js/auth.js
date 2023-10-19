const regForm = document.querySelector(".regForm");
const codeForm = document.querySelector(".codeForm");
const tokenStore = document.getElementById("token");
const htmlStore = document.getElementById("htmlStore");
const load = document.getElementById("load");
const errorHere = document.querySelector("#error");
const email = document.getElementById("email");

const token = tokenGen();

let htmlPage = "forgot";
let tokenPage = "";

htmlStore.value = htmlPage;
tokenStore.value = token;

try {
    const current_page_token = String(window.location.href).split("?token=");
    const current_html = current_page_token[0].split("/");

    htmlPage = current_html[current_html.length - 1];
    tokenPage = current_page_token[1];
} catch (error) {
    console.log(error);
}
console.log(htmlPage);

try {
    regForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (htmlPage == "forgotpass.html") {
            load.style.visibility = "visible";
            window.localStorage.setItem("email", email.value);
        }

        const formData = new FormData(regForm);
        fetch("http://localhost/dca/php/auth.php" || "../php/auth.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                window.location = `../pages/entercode.html?token=${token}`;
            })
            .catch((error) => {
                load.style.visibility = "hidden";
            });
    });
} catch (error) { }

if (htmlPage == "entercode.html") {
    const inputs = document.querySelectorAll(".otp-box input");
    const fullOTP = document.getElementById("fullOTP");
    const errorFailed = document.getElementById("error");
    const newToken = document.getElementById("newToken");

    tokenStore.value = tokenPage;
    newToken.value = tokenGen();
    htmlStore.value = htmlPage;
    email.value = window.localStorage.getItem("email");

    let otp = "";
    inputs.forEach((input, index) => {
        input.dataset.index = index;
        input.addEventListener("paste", (event) => handleOtppaste(event));
        input.addEventListener("keyup", (event) => handleOtp(event));
    });

    function handleOtppaste(e) {
        const data = e.clipboardData.getData("text");
        const value = data.split("");
        if (value.length === inputs.length) {
            inputs.forEach((input, index) => (input.value = value[index]));
            submit();
        }
    }
    let num = 0;
    function handleOtp(e) {
        const input = e.target;
        let value = input.value;
        input.value = "";
        input.value = value ? value[0] : "";

        let fieldIndex = input.dataset.index;

        if (String(value).length > 0 && fieldIndex < inputs.length - 1) {
            if (num < 6) {
                num += 1;
            }
            input.nextElementSibling.focus();
        }

        if (e.key === "Backspace" && fieldIndex > 0) {
            input.previousElementSibling.focus();
            if (num > 0) {
                num -= 1;
            }
        }

        console.log(num);

        if (fieldIndex == inputs.length - 1 && num == 5) {
            submit();
        }
    }
    function submit() {
        console.log("Submitting....!");
        inputs.forEach((input) => {
            otp += input.value;
            input.disabled = true;
            input.classList.add("disabled");
        });
        fullOTP.value = otp;

        const formData = new FormData(codeForm);
        fetch("http://localhost/dca/php/auth.php" || "../php/auth.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);

                if (data == "Success") {
                    window.location = `../pages/passwordrecovery.html?token=${newToken.value}`;
                } else {
                    inputs.forEach((input) => {
                        otp += input.value;
                        input.disabled = false;
                        input.classList.remove("disabled");
                    });
                    otp = "";
                    errorFailed.innerHTML = "INVALID OR CODE HAS EXPIRED!!";
                    // setTimeout(() => {
                    //     window.location = `../pages/entercode.html?token=${tokenPage}`
                    // }, 3000);
                }
            });
    }
}

(function () {
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
})();

function rand() {
    return Math.random(1).toString(36).substring(2);
}

function tokenGen() {
    return rand() + rand() + rand() + rand() + rand() + rand() + rand() + rand();
}
