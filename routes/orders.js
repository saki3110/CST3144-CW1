const express = require('express');
const { getDB } = require('../mongodb');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const newOrder = req.body;
    const result = await db.collection('orders').insertOne(newOrder);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
