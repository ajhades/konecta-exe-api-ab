const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const pool = require('../../db/db');

let server;

beforeAll(() => {
  server = app.listen(process.env.TEST_PORT || 3000);
});

jest.mock('pg');

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await pool.end();
  server.close();
});

describe('POST /login', () => {
  jest.setTimeout(30000);
  it('should return a JWT token for valid credentials', async () => {
    const mockUser = {
      username: 'testuser',
      password: 'password123',
      role: 1,
    };

    pool.query.mockResolvedValueOnce({ rows: [mockUser] });

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app)
      .post('/login')
      .send({ username: 'wronguser', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Authentication failed');
  });
});
