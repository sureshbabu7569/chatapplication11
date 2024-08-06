// models/Message.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
