const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer')
const fs = require('fs');
const path = require('path'); 

const CreateCharacterSchema = require('../models/CreateCharacterSchema');
const CreateCharacterPersonalitySchema = require('../models/CreateCharacterPeronalitySchema')
const CreateCharacterIdealSchema = require('../models/CreateCharacterIdealSchema')
const CreateCharacterBondSchema = require('../models/CreateCharacterBondSchema')
const CreateCharacterFlawSchema = require('../models/CreateCharacterFlawSchema')
const CreateCharacterLanguageSchema = require('../models/CreateCharacterLanguageSchema')
const CreateCharacterTraitSchema = require('../models/CreateCharacterTraitSchema')
const CreateCharacterAttackSchema = require('../models/CreateCharacterAttackSchema')
const CreateCharacterEquipmentSchema = require('../models/CreateCharacterEquipmentSchema');
const CreateCharacterSpellSchema = require('../models/CreateCharacterSpellSchema');
const CreateCharacterTreasureSchema = require('../models/CreateCharacterTreasureSchema')
const CreateCharacterOrganisationSchema = require('../models/CreateCharacterOrganisationSchema')
const CreateCharacterCurrencySchema = require('../models/CreateCharacterCurrencySchema')

//Load all characters
router.get('/', async (req, res) => {
  try {
		const userId = req.query.userId; 
    const LoadCharacters = await CreateCharacterSchema.find({ userId });

    if (!LoadCharacters || LoadCharacters.length < 1) {
      return res.json({
        error: 'No characters to load'
      });
    }

    res.json(LoadCharacters);
  } catch (error) {
    console.error('Error fetching character data:', error);
    return res.json({
      error: 'Internal server error'
    });
  }
});

//Delete a character
router.delete('/DeleteCharacter/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const query = { characterId: characterId };

    const loadImages = await CreateCharacterSchema.findById(characterId);

    if (loadImages) {
      const deletedProfileImagePath = loadImages.characterProfileImageAddress;
      const deletedBodyImagePath = loadImages.characterBodyImageAddress;

      if (deletedProfileImagePath) {
        fs.unlinkSync(path.join(__dirname, '../../public/', deletedProfileImagePath));
      }
      if (deletedBodyImagePath) {
        fs.unlinkSync(path.join(__dirname, '../../public/', deletedBodyImagePath));
      }
    }

    const deleteOperations = [
      CreateCharacterSchema.findByIdAndDelete(characterId),
      CreateCharacterPersonalitySchema.deleteMany(query),
      CreateCharacterIdealSchema.deleteMany(query),
      CreateCharacterBondSchema.deleteMany(query),
      CreateCharacterFlawSchema.deleteMany(query),
      CreateCharacterLanguageSchema.deleteMany(query),
      CreateCharacterTraitSchema.deleteMany(query),
      CreateCharacterAttackSchema.deleteMany(query),
      CreateCharacterEquipmentSchema.deleteMany(query),
      CreateCharacterSpellSchema.deleteMany(query),
      CreateCharacterTreasureSchema.deleteMany(query),
      CreateCharacterOrganisationSchema.deleteMany(query),
      CreateCharacterCurrencySchema.deleteMany(query)
    ];

    await Promise.all(deleteOperations);

    return res.json({ success: 'Successfully deleted character data' });
  } catch (error) {
    console.error('Error deleting character data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;