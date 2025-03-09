let clicks = 0;
let isRunning = false;
let timerInterval;
let duration;
let timeLeft;
let userName = "";

const clickArea = document.getElementById("click-area");
const timerDisplay = document.getElementById("timer");
const resultsOverlay = document.getElementById("results-overlay");

alert("Code Crafted with 🩵 by Chirrenthen\nEnter your name and start clicking as fast as you can!");
clickArea.addEventListener("click", function() {
  if (!isRunning) {
    startTest();
  } else {
    clicks++;
  }
});

function startTest() {
  userName = document.getElementById("username").value.trim();
  if (userName === "") {
    alert("Please enter your name before starting.");
    return;
  }
  clicks = 0;
  isRunning = true;
  duration = parseInt(document.getElementById("time-select").value);
  timeLeft = duration;
  timerDisplay.textContent = timeLeft;
  clickArea.textContent = "Click as fast as you can!";
  // Append timer element back to click area
  clickArea.appendChild(timerDisplay);
  
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
  
  setTimeout(endTest, duration * 1000);
}

function endTest() {
  isRunning = false;
  let cps = (clicks / duration).toFixed(2);
  let rank = getRank(cps);
  
  document.getElementById("user-name").textContent = `Name: ${userName}`;
  document.getElementById("total-clicks").textContent = `Total Clicks: ${clicks}`;
  document.getElementById("final-cps").textContent = `CPS: ${cps}`;
  document.getElementById("rank").textContent = `Rank: ${rank}`;
  
  // Show results overlay
  resultsOverlay.classList.add('show');
  
  // Confetti animation
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function getRank(cps) {
  if (cps < 3) return "🐢 Turtle";
  if (cps < 6) return "🐇 Rabbit";
  if (cps < 9) return "🐙 Octopus";
  return "⚡ Cheetah";
}

document.getElementById("reset").addEventListener("click", function() {
  resultsOverlay.classList.remove('show');
  clickArea.textContent = "Click to Start";
  timerDisplay.textContent = 0;
  isRunning = false;
});