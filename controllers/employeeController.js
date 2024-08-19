const { getPaginatedData } = require('../db/dbPageQueries');
const Employee = require('../models/employee');
const employeeSchema = require('../validation/employeeSchema');
const { idSchema } = require('../validation/generalSchema');

/**
 * Controller to list all employees with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */

const indexEmployee = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

  try {
    const paginatedData = await getPaginatedData(
      'employees',
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
 * Controller to create an employee with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const createEmployee = async (req, res) => {
  const { error } = employeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const employee = await Employee.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to find an employee with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const findEmployee = async (req, res) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const employee = await Employee.getEmployeeById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controller to update an employee with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const updateEmployee = async (req, res) => {
  const { error, value } = employeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const employee = await Employee.updateEmployee(req.params.id, req.body);
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to delete an employee with validation.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const deleteEmployee = async (req, res) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const wasDeleted = await Employee.deleteEmployee(req.params.id);
    if (wasDeleted) {
      res.json({ message: 'Employee marked as deleted', success: true });
    } else {
      res.status(404).json({ message: 'Employee not found', success: false });
    }
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  indexEmployee,
  createEmployee,
  findEmployee,
  updateEmployee,
  deleteEmployee,
};
