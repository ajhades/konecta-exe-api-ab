const { faker } = require('@faker-js/faker');
require('dotenv').config();
const pool = require('../db');

const seedApplications = async () => {
  const application = [];

  for (let i = 0; i < 20; i++) {
    application.push({
      employee_id: faker.number.int({ min: 1, max: 5 }),
      code: faker.string.alpha(10),
      description: faker.lorem.lines(2),
      resume: faker.lorem.sentences(2),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const request of application) {
      await pool.query(
        `INSERT INTO applications (employee_id, code, description, resume, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          request.employee_id,
          request.code,
          request.description,
          request.resume,
          request.created_at,
          request.updated_at,
        ]
      );
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error Applications queries: ', e);
    throw e;
  } finally {
    client.release();
    console.log('Applications seeding completed.');
  }
};

seedApplications().catch((err) =>
  console.error('Error seeding application', err)
);
