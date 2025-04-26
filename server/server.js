const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

let chatHistory = [];

app.use(cors());
app.use(express.json());

// Endpoint para adicionar comentários
app.post('/add-comment', (req, res) => {
  const { message } = req.body;
  if (message) {
    chatHistory.push(message.toLowerCase());
    res.send({ success: true });
  } else {
    res.status(400).send({ success: false, error: "Mensagem inválida" });
  }
});

// Endpoint para fornecer o wordcloud
app.get('/wordcloud', (req, res) => {
  res.send({ wordcloud: chatHistory.join(','), totalAttendees: chatHistory.length });
});

// Endpoint para limpar o histórico
app.get('/clear-chat', (req, res) => {
  chatHistory = [];
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Servidor de chat fake a correr em http://localhost:${port}`);
});
