const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterIdealSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterIdeal: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('CreateCharacterIdealSchema', CreateCharacterIdealSchema)