import axios from 'axios';
import dotenv from 'dotenv';
import pool from '../config/db.js';

dotenv.config();

export async function fetchAndSaveWeatherData(city = process.env.CITY) {
  try {
    const url = `${process.env.OPENWEATHER_BASE_URL}?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`;

    const response = await axios.get(url);
    const data = response.data;

    // Extrai os dados relevantes
    const weather = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
    };

    // Salva no banco
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

    console.log('✅ Dados salvos com sucesso:', result.rows[0]);

    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro ao buscar ou salvar dados do clima:', error.message);
    throw error;
  }
}