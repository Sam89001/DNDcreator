//ENV setup

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Requirements

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const App = express();

App.use(express.json());
App.use(cors());

//Database Connections

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

//Models

const RegisterSchema = require('./models/RegisterSchema');

//Controllers

const LoginController = require('./controllers/LoginController.js')
App.use('/', LoginController)

//Port

App.listen(3000, () => console.log("Server started on port 3000"));