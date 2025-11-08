import express from "express";
import pool from './config/db.js';
import dotenv from "dotenv";
import weatherRoutes from './routes/weatherRoutes.js';

dotenv.config(); // carrega variáveis do .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico
app.use(express.json());

// Rota de teste
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor rodando perfeitamente" });
});

// Rota de clima
app.use("/weather", weatherRoutes);

// Teste da conexão
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Erro ao testar conexão:', err);
  } else {
    console.log('🕒 Teste de conexão bem-sucedido:', result.rows[0]);
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
