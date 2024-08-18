const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

const authorizeRoles = require('../middlewares/autorizeRoles');

// Create Employee
router.post('/', authorizeRoles(['admin']), async (req, res) => {
  try {
    const employee = await Employee.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Employees
router.get('/', authorizeRoles(['admin', 'employee']), async (req, res) => {
  try {
    const employees = await Employee.getEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Employee by ID
router.get('/:id', authorizeRoles(['admin', 'employee']), async (req, res) => {
  try {
    const employee = await Employee.getEmployeeById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Employee
router.put('/:id', authorizeRoles(['admin']), async (req, res) => {
  try {
    const employee = await Employee.updateEmployee(req.params.id, req.body);
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Employee
router.delete('/:id', authorizeRoles(['admin']), async (req, res) => {
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
});

module.exports = router;
