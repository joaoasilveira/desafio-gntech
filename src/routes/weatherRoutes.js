import express from 'express';
import pool from '../config/db.js';
import { fetchAndSaveWeatherData } from '../services/openWeatherService.js';
import Logger from '../utils/logger.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const city = req.query.city || process.env.CITY;
    const data = await fetchAndSaveWeatherData(city);

    res.status(200).json({
      message: `Weather data for ${city} saved successfully!`,
      data,
    });
  } catch (error) {
  Logger.error('Error in /weather route:', error);
  res.status(500).json({ error: 'Failed to fetch or save weather data.' });
}
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM weather_data ORDER BY created_at DESC");
    res.status(200).json({
      message: "All weather records retrieved successfully.",
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    Logger.error('Error fetching weather records:', error);
    res.status(500).json({ error: "Database query failed." });
  }
});

export default router;