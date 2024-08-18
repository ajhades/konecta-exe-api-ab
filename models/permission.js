const pool = require('../db/db');

// Create Permission
const createPermission = async (permission) => {
  const { role_id, name, description } = permission;
  const result = await pool.query(
    `INSERT INTO permissions (role_id, name, description, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [role_id, name, description, new Date(), new Date()]
  );
  return result.rows[0];
};

// Read Permissions
const getPermissions = async () => {
  const result = await pool.query(
    `SELECT * FROM permissions WHERE deleted_at is null`
  );
  return result.rows;
};

// Read Permission by ID
const getPermissionById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM permissions WHERE id = $1 WHERE deleted_at is null`,
    [id]
  );
  return result.rows[0];
};

// Update Permission
const updatePermission = async (id, permission) => {
  const { role_id, name, description } = permission;
  const result = await pool.query(
    `UPDATE permissions SET role_id= $1, name = $2, description = $3, updated_at = $4
    WHERE id = $5 RETURNING *`,
    [role_id, name, description, new Date(), id]
  );
  return result.rows[0];
};

// Delete Permission
const deletePermission = async (id) => {
  const result = await pool.query(
    `UPDATE permissions SET deleted_at = $1 WHERE id = $2`,
    [new Date(), id]
  );
  return result.rowCount > 0;
};

module.exports = {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
