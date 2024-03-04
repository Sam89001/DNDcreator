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
  },
  characterSpellcastingClass: {
    type: String,
  },
  characterSpellcastingAbility: {
    type: String,
  },
  characterSpellSaveDC: {
    type: String,
  },
  characterSpellAttackBonus: {
    type: String,
  },
  characterSpellSlot1: {
    type: Number
  },
  characterSpellSlot2: {
    type: Number
  },
  characterSpellSlot3: {
    type: Number
  },
  characterSpellSlot4: {
    type: Number
  },
  characterSpellSlot5: {
    type: Number
  },
  characterSpellSlot6: {
    type: Number
  },
  characterSpellSlot7: {
    type: Number
  },
  characterSpellSlot8: {
    type: Number
  },
  characterSpellSlot9: {
    type: Number
  }

})

module.exports = mongoose.model('CreateCharacterSchema', CreateCharacterSchema)