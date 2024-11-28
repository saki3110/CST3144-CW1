const express = require('express');
const { getDB } = require('../mongodb');
const router = express.Router();

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const lessons = await db.collection('lessons').find().toArray();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Update a lesson (e.g., reduce spaces)
router.put('/:id', async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const updateData = req.body;

    const result = await db.collection('lessons').updateOne(
      { _id: new require('mongodb').ObjectId(id) },
      { $set: updateData }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lesson' });
  }
});

module.exports = router;
