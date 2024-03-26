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

//Get character stats
router.get('/:characterId', async (req, res) => {
  try {
    const characterId = req.params.characterId; 
    const LoadCharacters = await CreateCharacterSchema.findById(characterId);
    const LoadCharacterPersonalityTraits = await CreateCharacterPersonalitySchema.find({ characterId: characterId })
    const LoadCharacterIdeal = await CreateCharacterIdealSchema.find({ characterId: characterId })
    const LoadCharacterBonds = await CreateCharacterBondSchema.find({ characterId: characterId })
    const LoadCharacterFlaw = await CreateCharacterFlawSchema.find({ characterId: characterId })
    const LoadCharacterLanguage = await CreateCharacterLanguageSchema.find({ characterId: characterId })
    const LoadCharacterTrait = await CreateCharacterTraitSchema.find({ characterId: characterId })
    const LoadCharacterAttack = await CreateCharacterAttackSchema.find({ characterId: characterId })
    const LoadCharacterEquipment = await CreateCharacterEquipmentSchema.find({ characterId: characterId })
    const LoadCharacterCurrency = await CreateCharacterCurrencySchema.find({ characterId: characterId})
    const LoadSpells = await CreateCharacterSpellSchema.find({ characterId: characterId })
    const LoadTreasure = await CreateCharacterTreasureSchema.find({ characterId: characterId })
    const LoadOrganisation = await CreateCharacterOrganisationSchema.find({ characterId: characterId })

    if (!LoadCharacters) {
      return res.json({
        error: 'No characters found with the specified ID'
      });
    }
    const responseData = {
      character: LoadCharacters,
      personalityTraits: LoadCharacterPersonalityTraits,
      ideals: LoadCharacterIdeal,
      bonds: LoadCharacterBonds,
      flaws: LoadCharacterFlaw,
      languages: LoadCharacterLanguage,
      traits: LoadCharacterTrait,
      attacks: LoadCharacterAttack,
      equipment: LoadCharacterEquipment,
      currency: LoadCharacterCurrency,
      spells: LoadSpells,
      treasure: LoadTreasure,
      organisation: LoadOrganisation,
    };
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching character data:', error);
    return res.json({
      error: 'Internal server error'
    });
  }
});

//Updates Temp HP
router.put('/UpdateTempHp/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterTempHp } = req.body; 
    const characterData = { characterTempHp };

    const hpCheck = await CreateCharacterSchema.findById(id)

    if (isNaN(characterTempHp)) {
      return res.json({
        error: 'Temp Hp must be a number.',
      });
    }

    console.log(hpCheck)

    if (characterTempHp > hpCheck.characterHp) {
      return res.json({
        error: 'Temp Hp cannot exceed Max HP.',
      });
    }

    const update = await CreateCharacterSchema.findByIdAndUpdate(
      id,
      { $set: characterData },
      { new: true }
    );

    if (!update) {
      return res.status(404).json({
        error: 'Error updating character data',
      });
    }

    return res.json({
      success: true,
      updatedTempHp: update.characterTempHp
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});


module.exports = router;