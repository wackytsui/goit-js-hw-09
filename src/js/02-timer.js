import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

// reference for the button, date and time picker, 
const refId = {
    dateTimePicker: document.querySelector("input#datetime-picker"),
	startBtn: document.querySelector("button[data-start]"),
	days: document.querySelector("span[data-days]"),
	hours: document.querySelector("span[data-hours]"),
	minutes: document.querySelector("span[data-minutes]"),
	seconds: document.querySelector("span[data-seconds]"),
    
}

refId.startBtn.disabled = true;

// oprions to select the date and time for future countdown
const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const selectedDate = selectedDates[0];
		const startTime = Date.now();

        // simple alert or notification that the select date is not the future date to countdown
		if (selectedDate < startTime) {
			Notify.failure("Please choose a date in the future");
			refId.startBtn.disabled = true;
			return;
		}

		refId.startBtn.disabled = false;
		let intervalId = null;

        // button to start the countdown
		refId.startBtn.addEventListener("click", startCountdown);

		function startCountdown() {
			refId.startBtn.disabled = true;
			refId.dateTimePicker.disabled = true;

			intervalId = setInterval(() => {
				const currentTime = Date.now();

				if (selectedDate < currentTime) {
					clearInterval(intervalId);
					refId.dateTimePicker.disabled = false;
					return;
				}

				const timeDifference = selectedDate - currentTime;
				const { days, hours, minutes, seconds } = convertMs(timeDifference);

				refId.days.textContent = addLeadingZero(days);
				refId.hours.textContent = addLeadingZero(hours);
				refId.minutes.textContent = addLeadingZero(minutes);
				refId.seconds.textContent = addLeadingZero(seconds);
			});
		}
	},
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
	return String(value).padStart(2, "0"); //01
}

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