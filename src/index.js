import app from './app.js';
import pool from './config/db.js';
import { PORT } from './config/config.js';
import Logger from './utils/logger.js';

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