const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterTreasureSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterTreasureName: {
    type: String,
    required: true,
  },
  characterTreasureQuantity: {
    type: String,
    required: true,
  },
  characterTreasureDescription: {
    type: String,
    required: true,
  },
  
})

module.exports = mongoose.model('CreateCharacterTreasureSchema', CreateCharacterTreasureSchema)