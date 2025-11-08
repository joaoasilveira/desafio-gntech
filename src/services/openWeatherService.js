import axios from 'axios';
import pool from '../config/db.js';
import Logger from '../utils/logger.js'
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL, CITY } from '../config/config.js';

export async function fetchAndSaveWeatherData(city = CITY) {
  try {
    const url = `${OPENWEATHER_BASE_URL}?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`;

    const response = await axios.get(url);
    const data = response.data;

    const weather = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
    };

    const query = `
      INSERT INTO weather_data (city, temperature, description, humidity, wind_speed)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      weather.city,
      weather.temperature,
      weather.description,
      weather.humidity,
      weather.wind_speed,
    ]);

    Logger.info(`Weather data saved successfully for city: ${city}`);

    return result.rows[0];
  } catch (error) {
    Logger.error('Error fetching or saving weather data:', error.message);
    throw error;
  }
}