import express from "express";
import pool from './config/db.js';
import weatherRoutes from './routes/weatherRoutes.js';
import Logger from './utils/logger.js';
import { PORT } from './config/config.js';

const app = express();
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
