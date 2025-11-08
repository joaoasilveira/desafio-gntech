import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
export const OPENWEATHER_BASE_URL = process.env.OPENWEATHER_BASE_URL;
export const CITY = process.env.CITY || 'Florianopolis';