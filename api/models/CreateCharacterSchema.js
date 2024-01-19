const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterSchema = new mongoose.Schema({
  userId: {
		type: String,
  },
  characterName: {
    type: String,
  }
    
})

module.exports = mongoose.model('CreateCharacterSchema', CreateCharacterSchema)