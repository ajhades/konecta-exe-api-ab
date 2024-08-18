var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { getPaginatedData } = require('../db/dbPageQueries');

const authorizeRoles = require('../middlewares/autorizeRoles');

// Create User
router.post('/', authorizeRoles(['admin']), async (req, res) => {
  try {
    const user = await User.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Users
router.get('/', authorizeRoles(['admin']), async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const paginatedData = await getPaginatedData('users', page, pageSize, 'id');
    res.json(paginatedData);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Read User by ID
router.get('/:id', authorizeRoles(['admin']), async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User
router.put('/:id', authorizeRoles(['admin']), async (req, res) => {
  try {
    const user = await User.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete User
router.delete('/:id', authorizeRoles(['admin']), async (req, res) => {
  try {
    const wasDeleted = await User.deleteUser(req.params.id);
    if (wasDeleted) {
      res.json({ message: 'User marked as deleted', success: true });
    } else {
      res.status(404).json({ message: 'User not found', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
