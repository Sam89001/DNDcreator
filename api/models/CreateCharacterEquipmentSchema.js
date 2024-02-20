const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterEquipmentSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterEquipmentName: {
    type: String,
    required: true,
  },
  characterEquipmentQuantity: {
    type: String,
    required: true,
  },
  characterEquipmentDescription: {
    type: String,
    required: true,
  },
  
})

module.exports = mongoose.model('CreateCharacterEquipmentSchema', CreateCharacterEquipmentSchema)