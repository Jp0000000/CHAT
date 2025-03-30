const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Permite qualquer origem (frontend pode conectar)
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("Novo usuário conectado:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("Mensagem recebida:", message);

    // Envia a mensagem para todos os outros usuários
    io.emit("receiveMessage", message); // Envia a mensagem para todos os usuários

    // Aqui você pode enviar uma resposta automatizada ao "agente" (bot ou sistema)
    const botResponse = "Olá! Eu sou o agente, você disse: " + message;
    socket.emit("receiveMessage", botResponse); // Responde para o usuário que enviou
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
