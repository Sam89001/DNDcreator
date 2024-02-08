const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterBondSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterBond: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('CreateCharacterBondSchema', CreateCharacterBondSchema)