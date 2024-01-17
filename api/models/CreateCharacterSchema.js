const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterSchema = new mongoose.Schema({
    charactername: {
        type: String,
        unique: true
    }
    
})

module.exports = mongoose.model('CreateCharacterSchema', CreateCharacterSchema)