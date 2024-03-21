const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterCurrencySchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterCurrencyName: {
    type: String
  },
  characterCurrencyAmount: {
    type: Number
  },
})

module.exports = mongoose.model('CreateCharacterCurrencySchema', CreateCharacterCurrencySchema)