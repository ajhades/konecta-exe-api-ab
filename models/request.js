const pool = require('../db/db');

// Create Request
const createRequest = async (request) => {
  const { employee_id, code, description, resume } = request;
  const result = await pool.query(
    `INSERT INTO requests (employee_id, code, description, resume, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [employee_id, code, description, resume, new Date(), new Date()]
  );
  return result.rows[0];
};

// Read Requests
const getRequests = async () => {
  const result = await pool.query(
    `SELECT * FROM requests WHERE deleted_at is null`
  );
  return result.rows;
};

// Read Request by ID
const getRequestById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM requests WHERE id = $1 WHERE deleted_at is null`,
    [id]
  );
  return result.rows[0];
};

// Update Request
const updateRequest = async (id, request) => {
  const { employee_id, code, description, resume } = request;
  const result = await pool.query(
    `UPDATE requests SET employee_id = $1, code = $2, description = $3, resume = $4, updated_at = $5 
    WHERE id = $6 RETURNING *`,
    [employee_id, code, description, resume, new Date(), id]
  );
  return result.rows[0];
};

// Delete Request
const deleteRequest = async (id) => {
  const result = await pool.query(
    `UPDATE requests SET deleted_at = $1 WHERE id = $2`,
    [new Date(), id]
  );
  return result.rowCount > 0;
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
