const express = require('express');
const { connectDB } = require('./mongodb');

const app = express();

// Connect to MongoDB
connectDB();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    console.log("Request Body: ", req.body);
  }
  next();
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
