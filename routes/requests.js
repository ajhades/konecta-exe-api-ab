const express = require('express');
const router = express.Router();
const Request = require('../models/request');

// Create Request
router.post('/', async (req, res) => {
  try {
    const request = await Request.createRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.getRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.getRequestById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Request
router.put('/:id', async (req, res) => {
  try {
    const request = await Request.updateRequest(req.params.id, req.body);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Request
router.delete('/:id', async (req, res) => {
  try {
    const wasDeleted = await Request.deleteRequest(req.params.id);
    if (wasDeleted) {
      res.json({ message: 'Request marked as deleted', success: true });
    } else {
      res.status(404).json({ message: 'Request not found', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
