// server.js
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('BiteReview API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
