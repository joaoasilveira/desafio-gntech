import express from 'express';
import pool from '../config/db.js';
import { fetchAndSaveWeatherData } from '../services/openWeatherService.js';
import Logger from '../utils/logger.js';
import { z } from 'zod';

const router = express.Router();

const weatherRequestSchema = z.object({
  city: z.string().min(1, "City name is required"),
});

router.post('/', async (req, res) => {
  try {
    const parseResult = weatherRequestSchema.safeParse(req.query);

    if (!parseResult.success) {
      Logger.warn('Invalid request parameters', parseResult.error.format());
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const { city } = parseResult.data;
    
    const data = await fetchAndSaveWeatherData(city);

    res.status(201).json({
      message: `Weather data for ${city} saved successfully!`,
      data,
    });
  } catch (error) {
      Logger.error('Error in /weather route:', error);
      if (error.response?.status === 404) {
        return res.status(404).json({ error: 'City not found' });
      }
      res.status(500).json({ error: 'Failed to fetch or save weather data.' });
  } 
});

router.get("/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const totalResult = await pool.query("SELECT COUNT(*) FROM weather_data");
    const total = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    const result = await pool.query(
      "SELECT * FROM weather_data ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
      res.status(200).json({
      message: "All weather records retrieved successfully.",
      page,
      limit,
      total,
      totalPages,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    Logger.error('Error fetching weather records:', error);
    res.status(500).json({ error: "Database query failed." });
  }
});

export default router;