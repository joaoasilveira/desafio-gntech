import pool from '../db/index.js';

export async function insertWeather(weather) {
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
  return result.rows[0];
}

export async function getWeatherAll({ limit = 10, offset = 0 } = {}) {
  const totalResult = await pool.query("SELECT COUNT(*) FROM weather_data");
  const total = parseInt(totalResult.rows[0].count);
  const totalPages = Math.ceil(total / limit);

  const result = await pool.query(
    "SELECT * FROM weather_data ORDER BY created_at DESC LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  return {
    rows: result.rows,
    total,
    totalPages,
  };
}