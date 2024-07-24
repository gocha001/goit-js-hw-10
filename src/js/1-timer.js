import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputPicker = document.querySelector('#datetime-picker');
const btnStartTimer = document.querySelector('[data-start]');
const timerFieldDays = document.querySelector('[data-days]');
const timerFieldHours = document.querySelector('[data-hours]');
const timerFieldMinutes = document.querySelector('[data-minutes]');
const timerFieldSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;
let isActive = false;
btnStartTimer.disabled = true;
inputPicker.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] - currentDate > 0) {
      userSelectedDate = selectedDates[0];
      btnStartTimer.disabled = false;
      console.dir(btnStartTimer.disabled);
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        transitionIn: 'bounceInDown',
      });
      btnStartTimer.disabled = true;
      console.dir(btnStartTimer.disabled);
    }
  },
};

flatpickr('#datetime-picker', options);

btnStartTimer.addEventListener('click', onTimerStart);

function onTimerStart() {
  inputPicker.disabled = true;
  btnStartTimer.disabled = true;
  console.dir(btnStartTimer.disabled);
  if (isActive) {
    return;
  }
  isActive = true;
  timerId = setInterval(() => {
    const startTime = new Date();
    const diff = userSelectedDate - startTime;

    if (diff < 0) {
      clearInterval(timerId);
      isActive = false;
      inputPicker.disabled = false;
      return;
    }
    updateTimerFase(convertMs(diff));
  }, 1000);
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimerFase({ days, hours, minutes, seconds }) {
  timerFieldDays.textContent = addLeadingZero(days);
  timerFieldHours.textContent = addLeadingZero(hours);
  timerFieldMinutes.textContent = addLeadingZero(minutes);
  timerFieldSeconds.textContent = addLeadingZero(seconds);
}
