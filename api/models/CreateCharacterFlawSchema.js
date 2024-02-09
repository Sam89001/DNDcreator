const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterFlawSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterFlaw: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('CreateCharacterFlawSchema', CreateCharacterFlawSchema)