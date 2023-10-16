function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let inetrvalId = null

function startColorChange() {
    startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(() => { 
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

function stopColorChange() {
    clearInterval(intervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
    body.style.backgroundColor = '';
};

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);
