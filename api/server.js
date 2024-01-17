
  // Requirements
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const dotenv = require('dotenv').config();
  const cookieParser = require('cookie-parser');
  
  const App = express();

  //prevent cors error
  App.use(cors({
    credentials: true,
		origin: 'http://localhost:3000'
  }));

  //middleware
  App.use(express.json());
  App.use(cookieParser());
  App.use(express.urlencoded({extended: false}));

  // Database Connections
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to Mongoose'));

  //Middleware
  App.use(express.json())
  
  // Models

  // Controllers
  App.use('/', require('./routes/loginRoutes'));
  App.use('/Home', require('./routes/homeRoutes'));
  App.use('/CreateCharacter', require('./routes/createCharacterRoutes'));
  
  // Port
  const port = process.env.PORT || 4000; // Utilizing process.env.PORT if available
  App.listen(port, () => console.log(`Server started on port ${port}`));
  