import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
const date = new Date();
startBtn.setAttribute('disabled', true);

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(date),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    if (selectedDate.getTime() < Date.now()) {
      startBtn.setAttribute('disabled', true);
      iziToast.error({
        message: 'Please choose a date in the future',
        theme: 'light',
        backgroundColor: '#B51B1B',
        messageColor: '#FFFFFF',
        position: 'topRight',
        iconUrl: '../img/icon.svg',
        iconColor: '#FFFFFF',
        color: '#FFFFFF',
      });
    } else {
      startBtn.removeAttribute('disabled');
      userSelectedDate = selectedDate.getTime();
    }
  },
};

flatpickr(dateInput, options);

class Countdown {
  constructor(tick) {
    this.intervalId = null;
    this.tick = tick;
  }

  start() {
    this.intervalId = setInterval(() => {
      const diff = userSelectedDate - Date.now();
      const convertedValues = this.convertMs(diff);
      this.tick(convertedValues);
    }, 1000);
    startBtn.setAttribute('disabled', true);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  convertMs(ms) {
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
}

const countdown = new Countdown(onTick);

startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
  countdown.start();
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onTick(diff) {
  daysDisplay.textContent = addLeadingZero(diff.days);
  hoursDisplay.textContent = addLeadingZero(diff.hours);
  minutesDisplay.textContent = addLeadingZero(diff.minutes);
  secondsDisplay.textContent = addLeadingZero(diff.seconds);
  if (
    diff.days <= 0 &&
    diff.hours <= 0 &&
    diff.minutes <= 0 &&
    diff.seconds <= 0
  ) {
    countdown.stop();
  }
}
