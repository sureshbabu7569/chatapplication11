// routes/chatRoutes.js
const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

// Get messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Post a message
router.post('/', async (req, res) => {
  const { user, text } = req.body;
  try {
    const message = new Message({ user, text });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post message' });
  }
});

module.exports = router;
