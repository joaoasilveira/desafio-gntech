import pkg from 'pg';
import Logger from '../utils/logger.js';
import { DATABASE_URL } from './config.js';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on('connect', () => {
  Logger.info('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  Logger.error('Database connection error:', err);
});

export default pool;