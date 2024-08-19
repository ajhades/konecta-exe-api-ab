const { getPaginatedData } = require('../db/dbPageQueries');
const Application = require('../models/application');
const applicationSchema = require('../validation/applicationSchema');
const { idSchema } = require('../validation/generalSchema');

/**
 * Controller to list all applications with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */

const indexApplication = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

  try {
    const paginatedData = await getPaginatedData(
      'applications',
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
 * Controller to create an application with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const createApplication = async (req, res) => {
  const { error } = applicationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const application = await Application.createApplication(req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to find an application with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const findApplication = async (req, res) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const application = await Application.getApplicationById(req.params.id);
    if (!application)
      return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controller to update an application with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const updateApplication = async (req, res) => {
  const { error, value } = applicationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const application = await Application.updateApplication(
      req.params.id,
      req.body
    );
    if (!application)
      return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to delete an application with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const deleteApplication = async (req, res) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const wasDeleted = await Application.deleteApplication(req.params.id);
    if (wasDeleted) {
      res.json({ message: 'Application marked as deleted', success: true });
    } else {
      res
        .status(404)
        .json({ message: 'Application not found', success: false });
    }
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  indexApplication,
  createApplication,
  findApplication,
  updateApplication,
  deleteApplication,
};
