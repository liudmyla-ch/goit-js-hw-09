import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const timer = document.querySelector('.timer');
const timerValue = document.querySelectorAll('.value');
const timerLabel = document.querySelectorAll('.label');
const timerField = document.querySelectorAll('.field');
const chooseDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
let choosenDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenDate = selectedDates[0];
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);
timerStyle();
startBtn.disabled = true;

chooseDate.addEventListener('input', evt => {
  let currentDate = new Date();
  let choosenDate = new Date(evt.currentTarget.value);
  if (choosenDate < currentDate) {
    startBtn.disabled = true;
    return Notiflix.Notify.failure('Please choose a date in the future');
  }
  startBtn.disabled = false;
});

startBtn.addEventListener('click', () => {
  Notiflix.Notify.success('Countdown started!');
  startBtn.disabled = true;

  const timerId = setInterval(() => {
    let currentDate = new Date();
    let endDate = new Date(chooseDate.value);
    let deltaDate = convertMs(endDate - currentDate);

    days.textContent = addLeadingZero(deltaDate.days);
    hours.textContent = addLeadingZero(deltaDate.hours);
    minutes.textContent = addLeadingZero(deltaDate.minutes);
    seconds.textContent = addLeadingZero(deltaDate.seconds);

    let distance = (endDate.getTime() - currentDate.getTime()) * 0.001;

    if (distance < 1) {
      clearInterval(timerId);
      Notiflix.Notify.info('Countdown completed!');
    }
  }, 1000);
});

function addLeadingZero(value){
  return value.toString().padStart(2, '0');
};

function timerStyle() {
  for (let i = 0; i < timerValue.length; i++) {
    timerValue[i].style.fontSize = '48px';
    timerLabel[i].style.fontSize = '16px';
    timerField[i].style.display = 'flex';
    timerField[i].style.flexDirection = 'column';
    timerField[i].style.padding = '10px';
  };

  timer.style.display = 'flex';
  timer.style.textAlign = 'center';

  chooseDate.style.fontSize = '20px';
  startBtn.style.fontSize = '20px';
};


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
