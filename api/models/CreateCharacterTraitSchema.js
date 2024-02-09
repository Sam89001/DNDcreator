const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterTraitSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
  characterTraitTitle: {
    type: String,
    required: true,
  },
  characterTraitAdditionalInfo: {
    type: String,
    required: true,
  },
  characterTraitDescription: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('CreateCharacterTraitSchema', CreateCharacterTraitSchema)