describe('Postgres DB Connection', () => {
  it('should establish a successful pg db connection', async () => {
    const pool = require('../db/db');

    const client = await pool.connect();

    expect(client).toBeTruthy();

    client.release();
  });
});
