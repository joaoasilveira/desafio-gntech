import express from "express";
import Logger from './utils/logger.js';
import pool from './config/db.js';
import dotenv from "dotenv";
import weatherRoutes from './routes/weatherRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server running properly" });
});

app.use("/weather", weatherRoutes);

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    Logger.error('Database connection test failed:', err);
  } else {
    Logger.info('Database connection successful:', result.rows[0]);
  }
});

app.listen(PORT, () => {
  Logger.info(`Server running at http://localhost:${PORT}`);
});
