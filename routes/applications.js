const express = require('express');
const router = express.Router();
const {
  indexApplication,
  findApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');

const authorizeRoles = require('../middlewares/autorizeRoles');

// Create Application
router.post('/', authorizeRoles(['admin', 'employee']), createApplication);

// Read Applications
router.get('/', authorizeRoles(['admin', 'employee']), indexApplication);

// Read Application by ID
router.get('/:id', authorizeRoles(['admin', 'employee']), findApplication);

// Update Application
router.put('/:id', authorizeRoles(['admin', 'employee']), updateApplication);

// Delete Application
router.delete('/:id', authorizeRoles(['admin']), deleteApplication);

module.exports = router;
