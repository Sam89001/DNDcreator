const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');

const CreateCharacterSchema = require('../models/CreateCharacterSchema');
const CreateCharacterPersonalitySchema = require('../models/CreateCharacterPeronalitySchema')

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

//Load character stats
router.get('/:characterId', async (req, res) => {
  try {
    const characterId = req.params.characterId; 
    const LoadCharacters = await CreateCharacterSchema.findById(characterId);
    const LoadCharacterPersonalityTraits = await CreateCharacterPersonalitySchema.find({ characterId: characterId })

    if (!LoadCharacters) {
      return res.json({
        error: 'No characters found with the specified ID'
      });
    }

    const responseData = {
      character: LoadCharacters,
      personalityTraits: LoadCharacterPersonalityTraits
    };

    res.json(responseData);
 
  } catch (error) {
    console.error('Error fetching character data:', error);
    return res.json({
      error: 'Internal server error'
    });
  }
});

//Initial Creation of character
router.post('/CreateNewCharacter', async (req, res) => {
	try {
		const {characterName, id} = req.body

  //Validation
		if (!characterName || characterName.trim() === '') {
			return res.json({
				error: 'Please include a character name'
			})
		}

		const createCharacter = await CreateCharacterSchema.create({
			characterName,
			userId: id
		});

		res.json({ mongoId: createCharacter._id });

	} catch (error) {
		console.log(error)
	}
  
})

//Creates & Updates General Stats
router.put('/UpdateGeneralStats/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterName, characterClass, characterHp, characterAc, 
      characterLevel, characterRace, characterBackground, characterAlignment, 
      characterSpeed, characterXp } = req.body;
    
    console.log(id)

    const characterData = {
      characterName,
      characterClass,
      characterHp,
      characterAc,
      characterLevel,
      characterRace,
      characterBackground,
      characterAlignment,
      characterSpeed,
      characterXp
    };

    console.log(characterData)

    const updateGeneralStats = await CreateCharacterSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!updateGeneralStats) {
      return res.json({
        error: 'Error updating character data',
      });
    }

    return res.json({
      success: true,
    });

  } catch (error) {
    console.log(error);
  }

});

//Creates & Updates Skills
router.put('/UpdateSkills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterStrength, characterDexterity, characterConstitution, characterIntelligence,
      characterWisdom, characterCharisma, characterProficiencys } = req.body;

    const characterData = {
      characterStrength, characterDexterity, characterConstitution, characterIntelligence,
      characterWisdom, characterCharisma, characterProficiencys
    };

    const updateGeneralStats = await CreateCharacterSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!updateGeneralStats) {
      return res.json({
        error: 'Error updating character data',
      });
    }

    return res.json({
      success: true,
    });
    
  } catch (error) {
    console.log(error)
  }
})

//Creates & Updates MiscStats
router.put('/UpdateMiscStats/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const { characterInspiration, characterProficiencyBonus, 
    characterPerception, characterHitDice } = req.body;    
    const characterMiscData = { characterInspiration, characterProficiencyBonus, 
    characterPerception, characterHitDice } 

    const updateMiscStats = await CreateCharacterSchema.findByIdAndUpdate(
      id,
      {
        $set: characterMiscData
      },
      { new: true }
    );

    if (!updateMiscStats) {
      return res.json({
        error: 'Error updating character data',
      })
    }

    return res.json({
      success: true,
    });
    
  } catch (error) {
    console.log(error)
  }
})

//Creates a new Personality Trait
router.post('/UpdatePersonalityTrait/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterPersonalityTrait } = req.body; 
    const characterData = { characterId: id, characterPersonalityTrait: characterPersonalityTrait } 

    console.log('post request' + id)
		console.log('post request' + characterData)

    const updateCharacterPersonality = await CreateCharacterPersonalitySchema.create(
      characterData
    );

    if (!updateCharacterPersonality) {
      return res.json({
        error: 'Error updating character data',
      })
    }

    return res.json({
      success: true,
    });

  } catch (error) {
    console.log(error)
  }
})

//Updates a Personality Trait 
router.put('/ChangePersonalityTrait/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterPersonalityTrait } = req.body; 
    const personalityData = { characterPersonalityTrait }

    console.log('put request= ' + id)
    console.log('put request= ' + personalityData)

    const updatePersonalityTrait = await CreateCharacterPersonalitySchema.findByIdAndUpdate(
      id,
      {
        $set: personalityData
      },
      { new: true }
    );

    if (!updatePersonalityTrait) {
      return res.json({
        error: 'Error updating character data',
      })
    }

    return res.json({
      success: true,
    });

  } catch (error) {
    console.log(error)
  }
  
})

//Deletes a Personality Trait
router.delete('/DeletePersonalityTrait/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('deleted id' + id)

    const deletedTrait = await CreateCharacterPersonalitySchema.findByIdAndDelete(id);
    if (!deletedTrait) {
      return res.json({
        error: 'Error deleting character data',
      })
    }
    return res.json({
      success: 'Successfully deleted character data',
    });
    
  } catch (error) {
    console.log(error)
  }
})



module.exports = router;