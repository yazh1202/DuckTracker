let timeLeft = parseInt(25 * 60);
let timeMap = new Map([
    ["Pomodoro", parseInt(25 * 60)],
    ["ShortBreak", parseInt(5 * 60)],
    ["LongBreak", parseInt(15 * 60)],
]);
let pomodoroCount = 0;
let currentLabel = "POMODORO";
let isOn = false;
const pomodoro = document.getElementById("pomodoro");
const longbreak = document.getElementById("longbreak");
const shortbreak = document.getElementById("shortbreak");
const countdownEl = document.getElementById("countdown");
const restartButton = document.getElementById("start");
restartButton.addEventListener("click", action);
let interval;

function action() {
    if (isOn) {
        restartButton.innerHTML = "Start";
        isOn = false;
        pauseTimer();
    } else {
        restartButton.innerHTML = "Pause    ";
        isOn = true;
        startTimer();
    }
}

function pomodoroStart() {
    currentLabel = "POMODORO";
    timeLeft = parseInt(timeMap.get("Pomodoro"));
    startTimer();
}

function longBreakStart() {
    currentLabel = "LONGBREAK";
    timeLeft = parseInt(timeMap.get("LongBreak"));
    clearInterval(interval);
    startTimer();
}

function shortBreakStart() {
    currentLabel = "SHORTBREAK";
    timeLeft = parseInt(timeMap.get("ShortBreak"));
    clearInterval(interval);
    startTimer();
}

function startTimer() {
    document.body.style.backgroundColor = `var(--${currentLabel})`;
    interval = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        countdownEl.innerHTML = `${minutes}:${seconds}`;
        document.title = `DuckTracker-${minutes}:${seconds}`;
        timeLeft--;
        if (timeLeft == -1) {
            clearInterval(interval);
        }
    }, 1000);
    isOn = true;
}

function pauseTimer() {
    clearInterval(interval);
    isOn = false;
}

function restartTimer() {
    if (timeLeft != 25 * 60) {
        isOn = false;
        timeLeft = 25 * 60;
        clearInterval(interval);
        startTimer();
    }
}

function updateCountdown() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdownEl.innerHTML = `
                $ { minutes }: $ { seconds }
                `;
    document.title = `
                $ { minutes }: $ { seconds }
                `;
    timeLeft--;
}