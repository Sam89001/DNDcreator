const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterPersonalitySchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterPersonalityTrait: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('CreateCharacterPersonalitySchema', CreateCharacterPersonalitySchema)