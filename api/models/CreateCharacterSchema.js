const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterSchema = new mongoose.Schema({
  userId: {
		type: String,
		required: true
  },
  characterName: {
    type: String,
    unique: true
  }
    
})

module.exports = mongoose.model('CreateCharacterSchema', CreateCharacterSchema)