const express = require('express');
const router = express.Router();
const {
  indexRole,
  findRole,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');

const authorizeRoles = require('../middlewares/autorizeRoles');

// Create Role
router.post('/', authorizeRoles(['admin']), createRole);

// Read Roles
router.get('/', authorizeRoles(['admin']), indexRole);

// Read Role by ID
router.get('/:id', authorizeRoles(['admin']), findRole);

// Update Role
router.put('/:id', authorizeRoles(['admin']), updateRole);

// Delete Role
router.delete('/:id', authorizeRoles(['admin']), deleteRole);

module.exports = router;
