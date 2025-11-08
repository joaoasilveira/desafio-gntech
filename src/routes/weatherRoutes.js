import express from 'express';
import pool from '../config/db.js';
import { fetchAndSaveWeatherData } from '../services/openWeatherService.js';

const router = express.Router();

// GET /weather → busca dados na API e salva no banco
router.get('/', async (req, res) => {
  try {
    const city = req.query.city || process.env.CITY;
    const data = await fetchAndSaveWeatherData(city);

    res.status(200).json({
      message: `Dados do clima de ${city} salvos com sucesso!`,
      data,
    });
  } catch (error) {
    console.error('Erro na rota /weather:', error);
    res.status(500).json({ error: 'Erro ao buscar ou salvar dados do clima.' });
  }
});

// Retorna todos os registros de clima salvos no banco de dados
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM weather_data ORDER BY created_at DESC");
    res.status(200).json({
      message: "Todos os registros de clima",
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar registros de clima:", error);
    res.status(500).json({ error: "Erro ao consultar registros do banco." });
  }
});

export default router;