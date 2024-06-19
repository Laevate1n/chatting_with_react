const mongoose = require('mongoose');
const ChatCollection = new mongoose.Schema({
  sender: {
    type: String,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const Chat = mongoose.model('Chat', ChatCollection);
module.exports = Chat;