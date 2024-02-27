const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterSpellSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
	characterSpellName: {
    type: String,
    required: true,
  },
  characterSpellCastTime: {
    type: String,
    required: true,
  },
  characterSpellRangeArea: {
    type: String,
    required: true,
  },
  characterSpellDescription: {
    type: String,
    required: true,
  },
  characterSpellDuration: {
    type: String,
    required: true,
  },
  characterSpellSave: {
    type: String,
    required: true,
  },
  characterSpellSchool: {
    type: String,
    required: true,
  },
  characterSpellDamage: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('CreateCharacterSpellSchema', CreateCharacterSpellSchema)