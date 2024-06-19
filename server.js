const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./client/src/models/user');
const Chat = require('./client/src/models/messages');

const app = express();
const server = http.createServer(app);
const io = socketIO(server,{
  cors: {
    origin : '*',
  },
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://avrora:Walkingdead18.@192.168.0.70:27017/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

  socket.on('sendMessage', (messageData) => {
    console.log('Sender from client: ',messageData.sender);
    console.log('Message received:', messageData);
    io.emit('receiveMessage', messageData); 
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
  });
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username is already taken.' });
    }
    const newUser = new User({ username, password: hashedPassword, accepted: false });
    await newUser.save();
    res.json({ message: 'User registered successfully. Wait for admin approval.' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Failed to register. Please try again later.' });
  }
}); 

app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(403).json({ error: 'Invalid credentials or user not accepted. Please wait for approval.' });
      }
      if (!user.accepted) {
        return res.status(403).json({ message: 'User not yet accepted by admin.' });
      }
      res.json({ message: 'Login successful.' });
    } catch (error) {
      res.status(500).json({ message: 'Error during login.', error: error.message });
    }
  });

app.post('/send-message', async (req, res) => {
  try {
    const { sender, content } = req.body;
    const senderUser = await User.findOne({ username: sender });
    if (!senderUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const chat = new Chat({ sender: sender, content });
    await chat.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'An error occurred while sending the message' });
  }
});

app.get('/get-messages', async (req, res) => {
  try {
    const messages = await Chat.find().populate('content');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving messages' });
  }
});

const port = process.env.PORT || 5000;
server.listen(port,  () => {
  console.log(`Server listening on port ${port}`);
});