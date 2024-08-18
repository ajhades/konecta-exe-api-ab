const pool = require('../db/db');

// Create Employee
const createEmployee = async (employee) => {
  const { user_id, first_name, last_name, hire_date, salary } = employee;
  const result = await pool.query(
    `INSERT INTO employees (user_id, first_name, last_name, hire_date, salary, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [user_id, first_name, last_name, hire_date, salary, new Date(), new Date()]
  );
  return result.rows[0];
};

// Read Employees
const getEmployees = async () => {
  const result = await pool.query(
    `SELECT * FROM employees WHERE deleted_at is null`
  );
  return result.rows;
};

// Read Employee by ID
const getEmployeeById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM employees WHERE id = $1 WHERE deleted_at is null`,
    [id]
  );
  return result.rows[0];
};

// Update Employee
const updateEmployee = async (id, employee) => {
  const { user_id, first_name, last_name, hire_date, salary } = employee;
  const result = await pool.query(
    `UPDATE employees SET user_id = $1, first_name = $2, last_name = $3, hire_date = $4, salary = $5, updated_at = $6 
    WHERE id = $7 RETURNING *`,
    [user_id, first_name, last_name, hire_date, salary, new Date(), id]
  );
  return result.rows[0];
};

// Delete Employee
const deleteEmployee = async (id) => {
  const result = await pool.query(
    `UPDATE employees SET deleted_at = $1 WHERE id = $2`,
    [new Date(), id]
  );
  return result.rowCount > 0;
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
