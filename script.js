let intervalId = null;

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const speedInput = document.getElementById('speed');
const wordsInput = document.getElementById('words');
const logDiv = document.getElementById('log');

const usernames = ["Ana", "Pedro", "Rita", "João", "Miguel", "Sofia", "Tiago", "Luís", "Beatriz", "Carla"];

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateComment() {
  const words = wordsInput.value.split(',').map(w => w.trim()).filter(w => w !== "");
  const user = randomFromArray(usernames) + Math.floor(Math.random() * 1000);
  const message = randomFromArray(words);

  const fakeComment = {
    username: user,
    message: message
  };

  displayComment(fakeComment);
  sendFakeEvent(fakeComment);
}

function displayComment(comment) {
  const time = new Date().toLocaleTimeString();
  const logEntry = `[${time}] ${comment.username}: ${comment.message}\n`;
  logDiv.textContent += logEntry;
  logDiv.scrollTop = logDiv.scrollHeight;
}

function sendFakeEvent(comment) {
  // Esta função dispara o comentário como se fosse real
  const event = new CustomEvent('fake-chat-message', {
    detail: {
      username: comment.username,
      message: comment.message
    }
  });
  window.dispatchEvent(event);
}

startBtn.addEventListener('click', () => {
  if (intervalId) clearInterval(intervalId);
  const speed = parseInt(speedInput.value) || 1000;
  intervalId = setInterval(generateComment, speed);
});

stopBtn.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
