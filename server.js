const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');
app.use('/api', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/users',userRoutes);

// ✅ WebSocket Events
io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data); // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected:', socket.id);
  });
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});