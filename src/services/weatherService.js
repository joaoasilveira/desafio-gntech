import axios from 'axios';
import Logger from '../utils/logger.js'
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL, CITY } from '../config/config.js';
import * as weatherRepo from '../repositories/weatherRepository.js';

export async function fetchAndSaveWeatherData(city) {
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

    const savedWeather = await weatherRepo.insertWeather(weather);

    Logger.info(`Weather data saved successfully for city: ${city}`);

    return savedWeather;
  } catch (error) {
    Logger.error('Error fetching or saving weather data:', error.message);
    throw error;
  }
}

export async function getWeatherList({ page = 1, limit = 10 } = {}) {
  const offset = (page - 1) * limit;
  return await weatherRepo.getWeatherAll({ limit, offset });
}