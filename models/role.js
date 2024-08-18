const pool = require('../db/db');

// Create Role
const createRole = async (role) => {
  const { name, description } = role;
  const result = await pool.query(
    `INSERT INTO roles (name, description, created_at, updated_at) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, description, new Date(), new Date()]
  );
  return result.rows[0];
};

// Read Roles
const getRoles = async () => {
  const result = await pool.query(
    `SELECT * FROM roles WHERE deleted_at is null`
  );
  return result.rows;
};

// Read Role by ID
const getRoleById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM roles WHERE id = $1 WHERE deleted_at is null`,
    [id]
  );
  return result.rows[0];
};

// Update Role
const updateRole = async (id, role) => {
  const { name, description } = role;
  const result = await pool.query(
    `UPDATE roles SET name = $1, description = $2, updated_at = $3
    WHERE id = $4 RETURNING *`,
    [name, description, new Date(), id]
  );
  return result.rows[0];
};

// Delete Role
const deleteRole = async (id) => {
  const result = await pool.query(
    `UPDATE roles SET deleted_at = $1 WHERE id = $2`,
    [new Date(), id]
  );
  return result.rowCount > 0;
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
