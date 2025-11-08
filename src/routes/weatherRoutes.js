import express from 'express';
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

export default router;