const express = require('express');
const router = express.Router();
const Application = require('../models/application');

// Create Application
router.post('/', async (req, res) => {
  try {
    const request = await Application.createApplication(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Applications
router.get('/', async (req, res) => {
  try {
    const requests = await Application.getApplications();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Application by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await Application.getApplicationById(req.params.id);
    if (!request)
      return res.status(404).json({ message: 'Application not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Application
router.put('/:id', async (req, res) => {
  try {
    const request = await Application.updateApplication(
      req.params.id,
      req.body
    );
    if (!request)
      return res.status(404).json({ message: 'Application not found' });
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Application
router.delete('/:id', async (req, res) => {
  try {
    const wasDeleted = await Application.deleteApplication(req.params.id);
    if (wasDeleted) {
      res.json({ message: 'Application marked as deleted', success: true });
    } else {
      res
        .status(404)
        .json({ message: 'Application not found', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
