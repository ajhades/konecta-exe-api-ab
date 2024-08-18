const express = require('express');
const router = express.Router();
const Role = require('../models/role');

// Create Role
router.post('/', async (req, res) => {
  try {
    const role = await Role.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.getRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Role
router.put('/:id', async (req, res) => {
  try {
    const role = await Role.updateRole(req.params.id, req.body);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Role
router.delete('/:id', async (req, res) => {
  try {
    const wasDeleted = await Role.deleteRole(req.params.id);
    if (wasDeleted) {
      res.json({ message: 'Role marked as deleted', success: true });
    } else {
      res.status(404).json({ message: 'Role not found', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
