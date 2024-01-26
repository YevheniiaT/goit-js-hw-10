
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

let selectedDate = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    const currentDate = new Date();
    if (selectedDate.getTime() <= currentDate.getTime()) {
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
      });
    } else {
      startBtn.disabled = false;
      iziToast.success({
        title: 'OK!',
        message: 'You can press Start!',
        position: 'center',
      });
    }
  },
};


flatpickr(datetimePicker, options);

const timer = {
  timerInterval: null,
  start() {
    if (!selectedDate || this.timerInterval) {
      return;
    }
    
    datetimePicker.disabled = true;

    this.timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;

      if (deltaTime <= 0) {
        clearInterval(this.timerInterval);
        this.timerInterval = null; 
        updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      
        datetimePicker.disabled = false;
        startBtn.disabled = false;
      } else {
        const timeComponents = convertMs(deltaTime);
        updateTimer(timeComponents);
      }
    }, 1000);
  },
};

startBtn.addEventListener('click', () => {
startBtn.disabled = true;
  if (selectedDate) {
    timer.start();
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysElem.textContent = days;
  hoursElem.textContent = hours;
  minutesElem.textContent = minutes;
  secondsElem.textContent = seconds;
}