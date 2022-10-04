const lengthSlider = document.querySelector(".pass-length input"),
lengthText = document.querySelector(".pass-length span"),
passIndicator = document.querySelector(".pass-indicator"),
passwordInput = document.querySelector(".input-box input"),
copyIcon = document.querySelector(".input-box span"),
options = document.querySelectorAll(".pass-settings input"),
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option => {
        if(option.checked) {
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") {
                staticPassword = `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
    generatePassword();
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    let percent = (lengthSlider.value / lengthSlider.max) * 100;
    lengthSlider.style.background = `linear-gradient(to right, #4285F4 ${percent}%, #DFDFDF ${percent}%)`;
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value).then(() => {
        copyIcon.innerText = "check";
        copyIcon.style.color = "#4285F4";
        setTimeout(() => {
            copyIcon.innerText = "copy_all";
            copyIcon.style.color = "#707070";
        }, 1500);
    }).catch(err => {
        alert(`Couldn't copy the password: ${err}`);
    });
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);