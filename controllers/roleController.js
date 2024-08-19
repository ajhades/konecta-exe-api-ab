const { getPaginatedData } = require('../db/dbPageQueries');
const Role = require('../models/role');
const roleSchema = require('../validation/roleSchema');
const { idSchema } = require('../validation/generalSchema');

/**
 * Controller to list all roles with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */

const indexRole = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

  try {
    const paginatedData = await getPaginatedData(
      'roles',
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
 * Controller to create an role with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const createRole = async (req, res) => {
  const { error } = roleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const role = await Role.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to find an role with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const findRole = async (req, res) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const role = await Role.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controller to update an role with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const updateRole = async (req, res) => {
  const { error, value } = roleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const role = await Role.updateRole(req.params.id, req.body);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to delete an role with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const deleteRole = async (req, res) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const wasDeleted = await Role.deleteRole(req.params.id);
    if (wasDeleted) {
      res.json({ message: 'Role marked as deleted', success: true });
    } else {
      res.status(404).json({ message: 'Role not found', success: false });
    }
    res.json({ message: 'Role deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  indexRole,
  createRole,
  findRole,
  updateRole,
  deleteRole,
};
