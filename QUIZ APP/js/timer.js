document.addEventListener("DOMContentLoaded", function () {
    let timeLeft = 30; // Timer starts at 30 seconds
    let timerText = document.getElementById("timer-text");
    let progressBar = document.getElementById("progress-bar");

    function updateTimer() {
        if (timeLeft <= 0) {
            document.getElementById("quiz-form").submit(); // Auto-submit form on timeout
        } else {
            timeLeft--;
            timerText.textContent = timeLeft + "s";
            progressBar.style.width = (timeLeft / 30) * 100 + "%";
        }
    }

    // Update timer every second
    let timerInterval = setInterval(updateTimer, 1000);
});
