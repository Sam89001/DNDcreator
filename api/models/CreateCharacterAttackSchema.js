const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterAttackSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterAttackName: {
    type: String,
    required: true,
  },
  characterAttackBonus: {
    type: String,
    required: true,
  },
  characterDamageType: {
    type: String,
    required: true,
  },
  
})

module.exports = mongoose.model('CreateCharacterAttackSchema', CreateCharacterAttackSchema)