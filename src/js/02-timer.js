import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
};

if (selectedDates <= new Date()) {
    Notiflix.Notify.warning('Будь ласка виберіть дату');
    startButton.disabled = true;
} else {
    startButton.disabled = false;
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
     const selectedDate = new Date(datetimePicker.value).getTime();
  const currentDate = new Date().getTime();
    const timeRemaining = selectedDate - currentDate;
    if (timeRemaining <= 0) {
    Notiflix.Notify.warning('Будь ласка виберіть дату');
    return;
    }
    startButton.disabled = true;
    countdownInterval = setInterval(() => {
        const time = convertMs(timeRemaining);
         document.querySelector('[data-days]').textContent = addLeadingZero(time.days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(time.hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(time.minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(time.seconds);
        timeRemaining -= 1000;
         if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Відлік завершено');
      startButton.disabled = false;
    }
  }, 1000);
});
