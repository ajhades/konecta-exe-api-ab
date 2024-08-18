const express = require('express');
const router = express.Router();
const Permission = require('../models/permission');

// Create Permission
router.post('/', async (req, res) => {
  try {
    const permission = await Permission.createPermission(req.body);
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Permissions
router.get('/', async (req, res) => {
  try {
    const permissions = await Permission.getPermissions();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Permission by ID
router.get('/:id', async (req, res) => {
  try {
    const permission = await Permission.getPermissionById(req.params.id);
    if (!permission)
      return res.status(404).json({ message: 'Permission not found' });
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Permission
router.put('/:id', async (req, res) => {
  try {
    const permission = await Permission.updatePermission(
      req.params.id,
      req.body
    );
    if (!permission)
      return res.status(404).json({ message: 'Permission not found' });
    res.json(permission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Permission
router.delete('/:id', async (req, res) => {
  try {
    const wasDeleted = await Permission.deletePermission(req.params.id);
    if (wasDeleted) {
      res.json({ message: 'Permission marked as deleted', success: true });
    } else {
      res.status(404).json({ message: 'Permission not found', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
