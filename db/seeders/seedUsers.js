const { faker } = require('@faker-js/faker');
require('dotenv').config();
const pool = require('../db');

const seedUsers = async () => {
  const users = [];

  for (let i = 0; i < 5; i++) {
    users.push({
      username: faker.internet.userName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
      role_id: i === 0 ? 1 : faker.number.int({ min: 1, max: 3 }),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const user of users) {
      await pool.query(
        `INSERT INTO users (username, email, password, role_id, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          user.username,
          user.email,
          user.password,
          user.role_id,
          user.created_at,
          user.updated_at,
        ]
      );
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error Users queries: ', e);
    throw e;
  } finally {
    client.release();
    console.log('Users seeding completed.');
  }
};

seedUsers().catch((err) => console.error('Error seeding users', err));
