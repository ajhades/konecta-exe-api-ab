var express = require('express');
var router = express.Router();
const {
  indexUser,
  findUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const authorizeRoles = require('../middlewares/autorizeRoles');

// Create User
router.post('/', authorizeRoles(['admin']), createUser);

// Read Users
router.get('/', authorizeRoles(['admin']), indexUser);

// Read User by ID
router.get('/:id', authorizeRoles(['admin']), findUser);

// Update User
router.put('/:id', authorizeRoles(['admin']), updateUser);

// Delete User
router.delete('/:id', authorizeRoles(['admin']), deleteUser);

module.exports = router;
