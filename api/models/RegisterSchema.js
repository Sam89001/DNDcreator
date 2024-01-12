const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('RegisterSchema', RegisterSchema)