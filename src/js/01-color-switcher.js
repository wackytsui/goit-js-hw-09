// get the random color using hex
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.querySelector("body");
stopBtn.disabled = true

let colorChangeInterval = null;
 
// function to start the color change
function startColor() {
    colorChangeInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    }, 1000);
}

// function to stop the random color
function stopColor() {
    clearInterval(colorChangeInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// calling the function to start and stop the random background color
startBtn.addEventListener("click", startColor);
stopBtn.addEventListener("click", stopColor)