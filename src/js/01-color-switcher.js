const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    let color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
