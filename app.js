// Check the answer
function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answerInput').value);
  if (userAnswer === currentQuestion.correctAnswer) {
    document.getElementById('feedback').textContent = 'Correct! Well done.';
    document.getElementById('feedback').style.color = 'green';
    setTimeout(generateQuestion, 1000); // New question after a short delay
  } else {
    document.getElementById('feedback').textContent = 'Oops! Try again.';
    document.getElementById('feedback').style.color = 'red';
  }
}

// Helper functions to manage cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function incrementCookie(name) {
  let value = parseInt(getCookie(name)) || 0;
  value++;
  setCookie(name, value, 7); // Cookie lasts for 7 days
}

function resetCounters() {
  setCookie('correctCounter', 0, 7);
  setCookie('incorrectCounter', 0, 7);
  updateDisplay();
}

function updateDisplay() {
  const correct = getCookie('correctCounter') || 0;
  const incorrect = getCookie('incorrectCounter') || 0;
  document.getElementById('counter').innerText = `Correct: ${correct} | Incorrect: ${incorrect}`;
}

// Example integration with your webpage logic
document.addEventListener('DOMContentLoaded', () => {
  // Initialize counters if not already set
  if (!getCookie('correctCounter')) setCookie('correctCounter', 0, 7);
  if (!getCookie('incorrectCounter')) setCookie('incorrectCounter', 0, 7);

  // Update the displayed counters
  updateDisplay();

  document.getElementById('submitButton').addEventListener('click', () => {
      const userAnswer = parseInt(document.getElementById('answerInput').value);
      if (userAnswer === currentQuestion.correctAnswer) {
          incrementCookie('correctCounter');
      } else {
          incrementCookie('incorrectCounter');
      }
      updateDisplay();
  });

  // Allow using the Enter key to submit the answer
  document.getElementById('answerInput').addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          document.getElementById('submitButton').click();
      }
  });

  // Reset button logic
  document.getElementById('resetCounters').addEventListener('click', resetCounters);
});

// Event listeners
document.getElementById('submitButton').addEventListener('click', checkAnswer);
