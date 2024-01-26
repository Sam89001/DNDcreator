const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  characterName: {
    type: String,
    required: true,
  },
  characterClass: {
    type: String,
  },
  characterHp: {
    type: String,
  },
  characterAc: {
    type: String,
  },
  characterLevel: {
    type: String,
  },
  characterRace: {
    type: String,
  },
  characterBackground: {
    type: String,
  },
  characterAlignment: {
    type: String,
  },
  characterSpeed: {
    type: String,
  },
  characterXp: {
    type: String,
  },
})

module.exports = mongoose.model('CreateCharacterSchema', CreateCharacterSchema)