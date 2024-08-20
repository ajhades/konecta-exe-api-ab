require('dotenv').config();
const pool = require('../db');

const seedRoles = async () => {
  const roles = [
    { name: 'admin', created_at: new Date(), updated_at: new Date() },
    { name: 'employee', created_at: new Date(), updated_at: new Date() },
    { name: 'guest', created_at: new Date(), updated_at: new Date() },
  ];

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const role of roles) {
      await client.query(
        `INSERT INTO roles (name, created_at, updated_at) VALUES ($1, $2, $3)`,
        [role.name, role.created_at, role.updated_at]
      );
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error Roles queries: ', e);
    throw e;
  } finally {
    client.release();
    console.log('Roles seeding completed.');
  }
};

seedRoles().catch((err) => console.error('Error seeding roles', err));
