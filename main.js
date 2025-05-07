function openFeatures() {
    let allElems = document.querySelectorAll(".elem");
    let allFullElems = document.querySelectorAll(".fullElem");
    let allElemsContainer = document.querySelector(".allElems");
    let allFullElemsBackBtn = document.querySelectorAll(".fullElem .back");

    allElems.forEach(function (elem, index) {
        elem.addEventListener("click", function () {
            // Hide grid cards
            allElemsContainer.style.display = "none";

            // Show the clicked fullElem section
            allFullElems[index].style.display = "flex";
        });
    });

    allFullElemsBackBtn.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
            // Hide current fullElem section
            allFullElems[index].style.display = "none";

            // Show the cards container again
            allElemsContainer.style.display = "flex";
        });
    });

}
openFeatures();

function addTask() {
    const form = document.querySelector('.addTask form');
    const taskInput = form.querySelector('input');
    const taskDetails = form.querySelector('textarea');
    const taskContainer = document.querySelector('.allTask');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = taskInput.value.trim();
        const details = taskDetails.value.trim();

        if (title === '') return; // stop being lazy and name your task 🫵

        // 🧱 Create parent task block
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task flex flex-col gap-2 bg-[#F8F3ED] px-4 py-4 mb-3 rounded-lg shadow';

        // 🔠 Title + button row
        const topRow = document.createElement('div');
        topRow.className = 'flex justify-between items-center';

        const titleElem = document.createElement('h5');
        titleElem.className = 'text-[#7A6855] text-lg font-medium';
        titleElem.textContent = title;

        const button = document.createElement('button');
        button.className = 'bg-green-600 rounded-lg text-white px-4 py-2 text-sm sm:text-base shadow-md hover:bg-green-700 active:scale-[0.95] transition-all duration-200 ease-in-out';
        button.textContent = 'Mark as Completed';

        // 📜 Description block
        const descPara = document.createElement('p');
        descPara.className = 'text-[#A88B6B] text-sm sm:text-base';
        descPara.textContent = details || 'No extra details provided';

        // 🔧 Append them right
        topRow.appendChild(titleElem);
        topRow.appendChild(button);
        taskDiv.appendChild(topRow);
        taskDiv.appendChild(descPara);
        taskContainer.appendChild(taskDiv);

        // 🔄 Reset form
        taskInput.value = '';
        taskDetails.value = '';
    });
}
addTask();

function motivation() {
    document.addEventListener("DOMContentLoaded", async () => {
        const quoteText = document.getElementById("quoteText");
        const quoteAuthor = document.getElementById("quoteAuthor");

        // Fetch a random motivational quote
        try {
            const response = await fetch("https://api.quotable.io/random?tags=inspire");
            const data = await response.json();

            // Update the content of the quote
            quoteText.innerText = `"${data.content}"`;
            quoteAuthor.innerText = `– ${data.author}`;
        } catch (error) {
            // Fallback quote in case of an error (just in case API fails)
            quoteText.innerText = `"Believe in yourself and all that you are."`;
            quoteAuthor.innerText = `– Christian D. Larson`;
        }
    });
}
motivation();


function timer() {
    document.addEventListener("DOMContentLoaded", () => {
        const timerDisplay = document.getElementById("timerDisplay");
        const modeDisplay = document.getElementById("mode");
        const startPauseBtn = document.getElementById("startPauseBtn");
        const resetBtn = document.getElementById("resetBtn");
        const progressBar = document.getElementById("progressBar");
        const closeButton = document.getElementById("3");

        let timer;
        let isRunning = false;
        let timeLeft = 1500; // 25 minutes in seconds (work session)
        let isWorkSession = true; // true = work, false = break
        let totalTime = 1500; // Total time for work session (for progress bar)

        // Start/Pause the timer
        startPauseBtn.addEventListener("click", () => {
            if (isRunning) {
                clearInterval(timer);
                isRunning = false;
                startPauseBtn.textContent = "Start";
            } else {
                startTimer();
                isRunning = true;
                startPauseBtn.textContent = "Pause";
            }
        });

        // Reset the timer
        resetBtn.addEventListener("click", () => {
            clearInterval(timer);
            isRunning = false;
            timeLeft = 1500; // Reset to 25 minutes
            totalTime = 1500;
            updateDisplay();
            progressBar.style.width = "100%"; // Reset progress bar
            startPauseBtn.textContent = "Start";
            modeDisplay.textContent = "Work Session";
            progressBar.classList.remove("bg-red-600", "bg-green-600");
        });

        // Close the Pomodoro section
        closeButton.addEventListener("click", () => {
            document.getElementById("pomodoroSection").classList.add("hidden");
        });

        // Timer function
        function startTimer() {
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                    updateProgressBar();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    startPauseBtn.textContent = "Start";
                    switchMode();
                }
            }, 1000);
        }

        // Switch between work and break sessions
        function switchMode() {
            if (isWorkSession) {
                timeLeft = 300; // Short break: 5 minutes
                modeDisplay.textContent = "Short Break";
                progressBar.classList.remove("bg-[#F5A623]"); // Remove work session color
                progressBar.classList.add("bg-[#4A90E2]"); // Add break color
            } else {
                timeLeft = 1500; // Work session: 25 minutes
                modeDisplay.textContent = "Work Session";
                progressBar.classList.remove("bg-[#4A90E2]"); // Remove break color
                progressBar.classList.add("bg-[#F5A623]"); // Add work session color
            }
            isWorkSession = !isWorkSession;
            totalTime = timeLeft; // Update the total time based on the session
            startTimer();
        }

        // Update the timer display
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
        }

        // Update the progress bar
        function updateProgressBar() {
            const progress = ((totalTime - timeLeft) / totalTime) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Format time to always show 2 digits
        function formatTime(time) {
            return time < 10 ? `0${time}` : time;
        }
    });
}
timer();
