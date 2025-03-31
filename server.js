const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path"); // Para gerenciar caminhos de arquivos

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Permite qualquer origem (frontend pode conectar)
  },
});

app.use(cors());

// Serve os arquivos estáticos (se tiver CSS, JS, etc. na pasta public)
app.use(express.static(path.join(__dirname, "public")));

// Rota para servir o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Ajuste o caminho conforme a estrutura de diretórios
});

io.on("connection", (socket) => {
  console.log("Novo usuário conectado:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("Mensagem recebida:", message);

    // Envia a mensagem para todos os outros usuários
    io.emit("receiveMessage", message); // Envia a mensagem para todos os usuários

    socket.emit("receiveMessage", botResponse); // Responde para o usuário que enviou
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
