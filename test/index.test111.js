const request = require('supertest');
const app = require('../app');

let server;

// beforeAll(() => {
//   server = app.listen(process.env.TEST_PORT || 3002);
// });

// afterAll(async () => {
//   server.close();
// });

describe('El Inicio', () => {
  test('Mostrar bienvenida', async () => {
    const res = await request(app).get('/');

    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.text).toContain('Welcome to Express');
  });
});
