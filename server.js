const express = require('express');
const path = require('path');
const { connectDB } = require('./mongodb');
const lessonsRoutes = require('./routes/lessons');
const ordersRoutes = require('./routes/orders');
const logger = require('./middleware/logger');
const staticMiddleware = require('./middleware/static');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(logger);
app.use('/images', staticMiddleware);
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/lessons', lessonsRoutes);
app.use('/api/orders', ordersRoutes);

// Render Frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
