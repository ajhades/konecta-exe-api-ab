const pool = require('../db/db');

// Create User
const createUser = async (user) => {
  const { username, email, password, role } = user;
  const result = await pool.query(
    `INSERT INTO users (username, email, password, role_id, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *`,
    [username, email, password, role, new Date(), new Date()]
  );
  return result.rows[0];
};

// Read Users
const getUsers = async () => {
  const result = await pool.query(
    `SELECT * FROM users WHERE deleted_at is null`
  );
  return result.rows;
};

// Read User by ID
const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1 AND deleted_at is null`,
    [id]
  );
  return result.rows[0];
};

// Update User
const updateUser = async (id, user) => {
  const { username, email, password, role } = user;
  const result = await pool.query(
    `UPDATE users SET username = $1, email = $2, password = $3, role_id = $4, updated_at = $5 
     WHERE id = $6 AND deleted_at is null RETURNING *`,
    [username, email, password, role, new Date(), id]
  );
  return result.rows[0];
};

// Delete User
const deleteUser = async (id) => {
  await pool.query(`UPDATE users SET deleted_at = $1 WHERE id = $2`, [
    new Date(),
    id,
  ]);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
