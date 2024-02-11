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
  characterInitiative: {
    type: String,
  },
  characterXp: {
    type: String,
  },
  characterProficiencys: {
    type: [String],  
    default: []
  },
  characterStrength: {
    type: String,
  },
  characterDexterity: {
    type: String,
  },
  characterConstitution: {
    type: String,
  },
  characterIntelligence: {
    type: String,
  },
  characterWisdom: {
    type: String,
  },
  characterCharisma: {
    type: String,
  },
  characterInspiration: {
    type: String,
  },
  characterProficiencyBonus: {
    type: String,
  },
  characterPerception: {
    type: String,
  },
  characterHitDice: {
    type: String,
  },
  characterSavingThrowProficiencys: {
    type: [String],  
    default: []
  },
  characterSkills: {
    type: [String],  
    default: []
  }

})

module.exports = mongoose.model('CreateCharacterSchema', CreateCharacterSchema)