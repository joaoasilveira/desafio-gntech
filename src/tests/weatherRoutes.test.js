import request from 'supertest';
import app from '../app.js';
import pool from '../config/db.js';

beforeAll(async () => {
  await pool.query('DELETE FROM weather_data');
});

afterAll(async () => {
  await pool.query('DELETE FROM weather_data');
  await pool.end();
});

describe('Weather Routes', () => {
  test('GET /health should return server status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /weather without city should fail', async () => {
    const res = await request(app).post('/weather');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('City name is required');
  });

  test('POST /weather with invalid city should return 404', async () => {
    const res = await request(app).post('/weather').query({ city: 'CidadeInvalida123' });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('City not found');
  });

  test('POST /weather with valid city should succeed', async () => {
    const res = await request(app).post('/weather').query({ city: 'Florianopolis' });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('city', 'Florianópolis');
  });

  test('GET /weather/all should return paginated data', async () => {
    const res = await request(app).get('/weather/all').query({ page: 1, limit: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
