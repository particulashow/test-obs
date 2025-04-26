let intervalId = null;

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const speedInput = document.getElementById('speed');
const wordsInput = document.getElementById('words');
const logDiv = document.getElementById('log');

// Lista de usernames falsos
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
  sendToServer(fakeComment);
}

function displayComment(comment) {
  const time = new Date().toLocaleTimeString();
  const logEntry = `[${time}] ${comment.username}: ${comment.message}\n`;
  logDiv.textContent += logEntry;
  logDiv.scrollTop = logDiv.scrollHeight;
}

function sendFakeEvent(comment) {
  const event = new CustomEvent('fake-chat-message', {
    detail: {
      username: comment.username,
      message: comment.message
    }
  });
  window.dispatchEvent(event);
}

// ✨ Novo: envia para o servidor local
function sendToServer(comment) {
  fetch('http://localhost:4000/add-comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: comment.message })
  }).catch(err => console.error('Erro ao enviar para o servidor:', err));
}

// Botões
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
