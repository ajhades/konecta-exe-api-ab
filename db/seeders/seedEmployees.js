const { faker } = require('@faker-js/faker');
require('dotenv').config();
const pool = require('../db');

const seedEmployees = async () => {
  const employees = [];

  for (let i = 1; i < 6; i++) {
    employees.push({
      user_id: i,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      salary: faker.finance.amount({ min: 800, max: 1100, dec: 0 }),
      hire_date: faker.date.past(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const employee of employees) {
      await pool.query(
        `INSERT INTO employees (user_id, first_name, last_name, salary, hire_date, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          employee.user_id,
          employee.first_name,
          employee.last_name,
          employee.salary,
          employee.hire_date,
          employee.created_at,
          employee.updated_at,
        ]
      );
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error Employees queries: ', e);
    throw e;
  } finally {
    client.release();
    console.log('Employees seeding completed.');
  }
};

seedEmployees().catch((err) => console.error('Error seeding employees', err));
