const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const resetBtn = document.getElementById("resetBtn");
const count = document.getElementById("count");

// Load from localStorage or default to 0
let counts = parseInt(localStorage.getItem("count")) || 0;

// Update count display
function updateDisplay() {
  count.textContent = counts;
  localStorage.setItem("count", counts);

  // Animate
  count.classList.add("animate");
  setTimeout(() => count.classList.remove("animate"), 150);
}

// Button actions
plusBtn.addEventListener("click", () => {
  counts++;
  updateDisplay();
});

minusBtn.addEventListener("click", () => {
  if (counts > 0) {
    counts--;
    updateDisplay();
  }
});

resetBtn.addEventListener("click", () => {
  counts = 0;
  updateDisplay();
});

// Initialize
updateDisplay();
