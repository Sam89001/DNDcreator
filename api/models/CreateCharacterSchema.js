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
    type: Number,
  },
  characterAc: {
    type: Number,
  },
  characterLevel: {
    type: Number,
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
    type: Number,
  },
  characterInitiative: {
    type: Number,
  },
  characterXp: {
    type: Number,
  },
  characterProficiencys: {
    type: [String],  
    default: []
  },
  characterStrength: {
    type: Number,
  },
  characterDexterity: {
    type: Number,
  },
  characterConstitution: {
    type: Number,
  },
  characterIntelligence: {
    type: Number,
  },
  characterWisdom: {
    type: Number,
  },
  characterCharisma: {
    type: Number,
  },
  characterInspiration: {
    type: Number,
  },
  characterProficiencyBonus: {
    type: Number,
  },
  characterPerception: {
    type: Number,
  },
  characterHitDice: {
    type: String,
  },
  characterSavingThrowProficiencys: {
    type: [String],  
    default: []
  },
  characterSkillProficiencys: {
    type: [String],  
    default: []
  }

})

module.exports = mongoose.model('CreateCharacterSchema', CreateCharacterSchema)