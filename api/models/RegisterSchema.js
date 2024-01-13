const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
    },
    password: {
        type: String,
    }
    
})

module.exports = mongoose.model('RegisterSchema', RegisterSchema)