const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterLanguageSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterLanguage: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('CreateCharacterLanguageSchema', CreateCharacterLanguageSchema)