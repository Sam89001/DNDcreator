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
  characterSpellLevel: {
    type: String,
    required: true,
  },
  characterSpellCastTime: {
    type: String,
    required: true,
  },
  characterSpellRangeArea: {
    type: String
  },
  characterSpellDescription: {
    type: String,
    required: true,
  },
  characterSpellDuration: {
    type: String
  },
  characterSpellSave: {
    type: String
  },
  characterSpellSchool: {
    type: String
  },
  characterSpellDamage: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('CreateCharacterSpellSchema', CreateCharacterSpellSchema)