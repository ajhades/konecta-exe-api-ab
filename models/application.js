const pool = require('../db/db');

// Create Application
const createApplication = async (request) => {
  const { employee_id, code, description, resume } = request;
  const result = await pool.query(
    `INSERT INTO applications (employee_id, code, description, resume, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [employee_id, code, description, resume, new Date(), new Date()]
  );
  return result.rows[0];
};

// Read Applications
const getApplications = async () => {
  const result = await pool.query(
    `SELECT * FROM applications WHERE deleted_at is null`
  );
  return result.rows;
};

// Read Application by ID
const getApplicationById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM applications WHERE id = $1 AND deleted_at is null`,
    [id]
  );
  return result.rows[0];
};

// Update Application
const updateApplication = async (id, request) => {
  const { employee_id, code, description, resume } = request;
  const result = await pool.query(
    `UPDATE applications SET employee_id = $1, code = $2, description = $3, resume = $4, updated_at = $5 
    WHERE id = $6 RETURNING *`,
    [employee_id, code, description, resume, new Date(), id]
  );
  return result.rows[0];
};

// Delete Application
const deleteApplication = async (id) => {
  const result = await pool.query(
    `UPDATE applications SET deleted_at = $1 WHERE id = $2`,
    [new Date(), id]
  );
  return result.rowCount > 0;
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
