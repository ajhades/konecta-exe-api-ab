var express = require('express');
var router = express.Router();
const User = require('../models/user');

// Create User
router.post('/', async (req, res) => {
  try {
    const user = await User.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Users
router.get('/', async (req, res) => {
  try {
    const users = await User.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read User by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User
router.put('/:id', async (req, res) => {
  try {
    const user = await User.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
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
