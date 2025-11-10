import express from 'express';
import Logger from '../utils/logger.js';
import { z } from 'zod';
import * as weatherService from '../services/weatherService.js';

const router = express.Router();

const weatherRequestSchema = z
  .object({
    city: z
      .string()
      .min(1, "City name is required")
      .refine((val) => val !== undefined && val !== null, {
        message: "City name is required",
      }),
  })
  .strict();

router.post('/', async (req, res) => {
  try {
    const query = req.query.city ?? "";
    const parseResult = weatherRequestSchema.safeParse({ city: query });

    if (!parseResult.success) {
      const firstError = parseResult.error.issues?.[0]?.message || "Invalid input";
      Logger.warn("Invalid request parameters", parseResult.error.format());
      return res.status(400).json({ error: firstError });
    }

    const { city } = parseResult.data;
    
    const data = await weatherService.fetchAndSaveWeatherData(city);

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
    const { rows, total, totalPages } = await weatherService.getWeatherList({ page, limit });
    
    res.status(200).json({
      message: "All weather records retrieved successfully.",
      page,
      limit,
      total,
      totalPages,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    Logger.error('Error fetching weather records:', error);
    res.status(500).json({ error: "Database query failed." });
  }
});

export default router;