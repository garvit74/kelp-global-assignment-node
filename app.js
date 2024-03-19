// app.js
const express = require('express');
const app = express();
const csvRoutes = require('./routes/csvRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/csv', csvRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
