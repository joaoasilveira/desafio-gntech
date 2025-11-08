import pkg from 'pg';
import dotenv from 'dotenv';
import Logger from '../utils/logger.js';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  Logger.info('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  Logger.error('Database connection error:', err);
});

export default pool;