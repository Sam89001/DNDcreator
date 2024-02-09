const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');

const CreateCharacterSchema = require('../models/CreateCharacterSchema');
const CreateCharacterPersonalitySchema = require('../models/CreateCharacterPeronalitySchema')
const CreateCharacterIdealSchema = require('../models/CreateCharacterIdealSchema')
const CreateCharacterBondSchema = require('../models/CreateCharacterBondSchema')
const CreateCharacterFlawSchema = require('../models/CreateCharacterFlawSchema')
const CreateCharacterLanguageSchema = require('../models/CreateCharacterLanguageSchema')

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
      languages: LoadCharacterLanguage
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

    const updateCharacterPersonality = await CreateCharacterPersonalitySchema.create(
      characterData
    );

    if (!updateCharacterPersonality) {
      return res.json({
        error: 'Error updating character data',
      })
    }

    return res.status(200).json({
      success: true,
      newPersonalityTrait: updateCharacterPersonality
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

//Creates a new Ideal
router.post('/UpdateIdeal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterIdeal } = req.body; 
    const characterData = { characterId: id, characterIdeal: characterIdeal } 

    const updateCharacterIdeal = await CreateCharacterIdealSchema.create(
      characterData
    );

    if (!updateCharacterIdeal) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newIdeal: updateCharacterIdeal
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates an Ideal
router.put('/ChangeIdeal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterIdeal } = req.body; 
    const characterData = { characterIdeal } 

    const updateIdeal = await CreateCharacterIdealSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!updateIdeal) {
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

//Deletes an Ideal
router.delete('/DeleteIdeal/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedIdeal = await CreateCharacterIdealSchema.findByIdAndDelete(id);
    if (!deletedIdeal) {
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

//Creates a Bond
router.post('/UpdateBond/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterBond } = req.body; 
    const characterData = { characterId: id, characterBond: characterBond } 

    const updateCharacterBond = await CreateCharacterBondSchema.create(
      characterData
    );

    if (!updateCharacterBond) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newBond: updateCharacterBond
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates a Bond
router.put('/ChangeBond/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterBond } = req.body; 
    const characterData = { characterBond } 

    const updateBond = await CreateCharacterBondSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!updateBond) {
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

//Deletes a Bond
router.delete('/DeleteBond/:id', async (req, res) => {
 try{
  const { id } = req.params;

  const deletedBond = await CreateCharacterBondSchema.findByIdAndDelete(id);
  if (!deletedBond) {
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

//Creates a Flaw
router.post('/UpdateFlaw/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterFlaw } = req.body; 
    const characterData = { characterId: id, characterFlaw: characterFlaw } 

    const updateCharacterFlaw = await CreateCharacterFlawSchema.create(
      characterData
    );

    if (!updateCharacterFlaw) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newFlaw: updateCharacterFlaw
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates a Flaw
router.put('/ChangeFlaw/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterFlaw } = req.body; 
    const characterData = { characterFlaw } 

    const updateFlaw = await CreateCharacterFlawSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!updateFlaw) {
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

//Deletes a Flaw 
router.delete('/DeleteFlaw/:id', async (req, res) => {
  try{
    const { id } = req.params;
  
    const deletedFlaw = await CreateCharacterFlawSchema.findByIdAndDelete(id);
    if (!deletedFlaw) {
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