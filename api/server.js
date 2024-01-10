
  // Requirements
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const dotenv = require('dotenv').config();
  
  const App = express();
  
  App.use(express.json());
  App.use(cors());
  
  // Database Connections
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to Mongoose'));
  
  // Models
  
  // Routes setup using the LoginController

  App.use('/', require('./routes/loginRoutes'));
  
  // Port
  const port = process.env.PORT || 4000; // Utilizing process.env.PORT if available
  App.listen(port, () => console.log(`Server started on port ${port}`));
  