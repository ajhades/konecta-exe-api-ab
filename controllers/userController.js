const { getPaginatedData } = require('../db/dbPageQueries');
const User = require('../models/user');
const userSchema = require('../validation/userSchema');
const { idSchema } = require('../validation/generalSchema');

/**
 * Controller to list all users with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */

const indexUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

  try {
    const paginatedData = await getPaginatedData(
      'users',
      page,
      pageSize,
      'id',
      filters
    );
    res.json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controller to create an user with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const user = await User.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to find an user with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const findUser = async (req, res) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controller to update an user with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const updateUser = async (req, res) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const user = await User.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to delete an user with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const deleteUser = async (req, res) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const wasDeleted = await User.deleteUser(req.params.id);
    if (wasDeleted) {
      res.json({ message: 'User marked as deleted', success: true });
    } else {
      res.status(404).json({ message: 'User not found', success: false });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  indexUser,
  createUser,
  findUser,
  updateUser,
  deleteUser,
};
