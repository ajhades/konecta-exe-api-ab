const express = require('express');
const router = express.Router();
const {
  indexEmployee,
  findEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const authorizeRoles = require('../middlewares/autorizeRoles');

// Create Employee
router.post('/', authorizeRoles(['admin']), createEmployee);

// Read Employees
router.get('/', authorizeRoles(['admin', 'employee']), indexEmployee);

// Read Employee by ID
router.get('/:id', authorizeRoles(['admin', 'employee']), findEmployee);

// Update Employee
router.put('/:id', authorizeRoles(['admin']), updateEmployee);

// Delete Employee
router.delete('/:id', authorizeRoles(['admin']), deleteEmployee);

module.exports = router;
