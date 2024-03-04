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
const CreateCharacterTraitSchema = require('../models/CreateCharacterTraitSchema')
const CreateCharacterAttackSchema = require('../models/CreateCharacterAttackSchema')
const CreateCharacterEquipmentSchema = require('../models/CreateCharacterEquipmentSchema');
const CreateCharacterSpellSchema = require('../models/CreateCharacterSpellSchema');

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

//Page Navigation
router.get('/NextPage/:sentId', async (req, res) => {
  try {
    const sentId = req.params.sentId; 
    console.log(sentId)
    const characterId = await CreateCharacterSchema.findById(sentId);

    if (!characterId) {
      return res.json({
        error: 'Error in navigation',
      });
    }

    console.log( "This is the characterID" + characterId);
    return res.status(200).json({
      success: true,
      mongoId: characterId
    });

  } catch (error) {
    console.log(error);
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
      equipment: LoadCharacterEquipment
    };
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching character data:', error);
    return res.json({
      error: 'Internal server error'
    });
  }
});

router.get('/:number/:sentId', async (req, res) => {
  try {
    const sentId = req.params.sentId; 
    const LoadCharacters = await CreateCharacterSchema.findById(sentId);
    const LoadSpells = await CreateCharacterSpellSchema.find({ characterId: sentId })

    if (!LoadCharacters) {
      return res.json({
        error: 'No characters found with the specified ID'
      });
    }
    const responseData = {
      character: LoadCharacters,
      spells: LoadSpells 
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
      characterSpeed, characterXp, characterInspiration, characterProficiencyBonus, 
      characterPerception, characterHitDice } = req.body;

      if (
        isNaN(characterHp) || isNaN(characterAc) || isNaN(characterLevel) ||
        isNaN(characterSpeed) || isNaN(characterXp) || isNaN(characterInspiration) ||
        isNaN(characterProficiencyBonus) || isNaN(characterPerception) 
      ) {
        return res.json({
          error: 'character Hp, AC, Level, Speed, XP, Inspiration, Proficiency Bonus and Perception must be numbers'
        });
      }

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
      characterXp,
      characterInspiration,
      characterProficiencyBonus,
      characterPerception,
      characterHitDice
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
    console.log(error);
  }

});

//Creates & Updates Skills
router.put('/UpdateSkills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterStrength, characterDexterity, characterConstitution, characterIntelligence,
      characterWisdom, characterCharisma, characterProficiencys } = req.body;

      if (
        isNaN(characterStrength) || isNaN(characterDexterity) || isNaN(characterConstitution) ||
        isNaN(characterIntelligence) || isNaN(characterWisdom) || isNaN(characterCharisma)
      ) {
        return res.json({
          error: 'Skills must be numbers',
        });
      }

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

//Creates a Language
router.post('/UpdateLanguage/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterLanguage } = req.body; 
    const characterData = { characterId: id, characterLanguage: characterLanguage } 

    const updateCharacterLanguage = await CreateCharacterLanguageSchema.create(
      characterData
    );

    if (!updateCharacterLanguage) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newLanguage: updateCharacterLanguage
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates a Language
router.put('/ChangeLanguage/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterLanguage } = req.body; 
    const characterData = { characterLanguage } 

    const updateLanguage = await CreateCharacterLanguageSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!updateLanguage) {
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

//Deletes a Language
router.delete('/DeleteLanguage/:id', async (req, res) => {
  try{
    const { id } = req.params;
  
    const deletedLanguage = await CreateCharacterLanguageSchema.findByIdAndDelete(id);
    if (!deletedLanguage) {
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

//Creates a Trait
router.post('/UpdateTrait/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterTraitTitle, characterTraitAdditionalInfo,
      characterTraitDescription } = req.body; 

    const characterData = { characterId: id, characterTraitTitle: characterTraitTitle,
      characterTraitAdditionalInfo: characterTraitAdditionalInfo, characterTraitDescription: characterTraitDescription } 

    const updateCharacterTrait = await CreateCharacterTraitSchema.create(
      characterData
    );

    if (!updateCharacterTrait) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newFeatureTrait: updateCharacterTrait
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates a Trait
router.put('/ChangeTrait/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterTraitTitle, characterTraitAdditionalInfo,
      characterTraitDescription } = req.body; 
    const characterData = { characterTraitTitle, characterTraitAdditionalInfo,
      characterTraitDescription } 

    const updateTrait = await CreateCharacterTraitSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!updateTrait) {
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

//Delete a Trait
router.delete('/DeleteTrait/:id', async (req, res) => {
  try{
    const { id } = req.params;
  
    const deletedTrait = await CreateCharacterTraitSchema.findByIdAndDelete(id);
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

//Creates an Attack
router.post('/UpdateAttack/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterAttackName, characterAttackBonus,
      characterDamageType } = req.body; 

    const characterData = { characterId: id, characterAttackName: characterAttackName,
      characterAttackBonus: characterAttackBonus, characterDamageType: characterDamageType } 

    const update = await CreateCharacterAttackSchema.create(
      characterData
    );

    if (!update) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newAttack: update
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates an Attack
router.put('/ChangeAttack/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {  characterAttackName, characterAttackBonus,
      characterDamageType } = req.body; 
    const characterData = {  characterAttackName, characterAttackBonus,
      characterDamageType } 

    const update = await CreateCharacterAttackSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!update) {
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

//Deletes an Attack
router.delete('/DeleteAttack/:id', async (req, res) => {
  try{
    const { id } = req.params;
  
    const deleted = await CreateCharacterAttackSchema.findByIdAndDelete(id);
    if (!deleted) {
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

//Creates Equipment
router.post('/UpdateEquipment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterEquipmentName, characterEquipmentQuantity,
      characterEquipmentDescription } = req.body; 

    const characterData = { characterId: id, characterEquipmentName: characterEquipmentName,
      characterEquipmentQuantity: characterEquipmentQuantity, characterEquipmentDescription: characterEquipmentDescription } 

    const update = await CreateCharacterEquipmentSchema.create(
      characterData
    );

    if (!update) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newEquipment: update
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates Equipment
router.put('/ChangeEquipment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {  characterEquipmentName, characterEquipmentQuantity,
      characterEquipmentDescription } = req.body; 
    const characterData = {  characterEquipmentName, characterEquipmentQuantity,
      characterEquipmentDescription } 

    const update = await CreateCharacterEquipmentSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!update) {
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

//Deletes Equipment
router.delete('/DeleteEquipment/:id', async (req, res) => {
  try{
    const { id } = req.params;
  
    const deleted = await CreateCharacterEquipmentSchema.findByIdAndDelete(id);
    if (!deleted) {
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

//Updates Character Saving Throws
router.put('/SavingThrows/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterSavingThrowProficiencys } = req.body;

    const characterData = {
      characterSavingThrowProficiencys
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
      })
    }

    return res.json({
      success: true,
    });
  } catch (error) {
  }
})

//Updates Character Skills
router.put('/ProficiencySkills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterSkillProficiencys } = req.body;

    const characterData = {
      characterSkillProficiencys
    };

    console.log(characterData)

    const update = await CreateCharacterSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!update) {
      return res.json({
        error: 'Error updating character data',
      })
    }

    return res.json({
      success: true,
    });
  } catch (error) {
  }
})

//Creates & Updates Spell General Stats
router.put('/UpdateGeneralSpellInfo/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { characterSpellcastingClass, characterSpellcastingAbility,
      characterSpellSaveDC, characterSpellAttackBonus } = req.body;

      if (
        isNaN(characterSpellSaveDC) 
      ) {
        return res.json({
          error: 'character Spell Save DC must be a number'
        });
      }

    const characterData = {
      characterSpellcastingClass, characterSpellcastingAbility,
      characterSpellSaveDC, characterSpellAttackBonus
    };

    const updateGeneralStats = await CreateCharacterSchema.findByIdAndUpdate(
      characterId,
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

//Creates & Updates Spell Slots
router.put('/UpdateTotalSpellSlots/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { characterSpellSlot1, characterSpellSlot2, characterSpellSlot3,
			characterSpellSlot4, characterSpellSlot5, characterSpellSlot6, characterSpellSlot7,
		  characterSpellSlot8, characterSpellSlot9 } = req.body;

      if (

        isNaN(characterSpellSlot1) || isNaN( characterSpellSlot2) || isNaN( characterSpellSlot3)
        || isNaN( characterSpellSlot4) || isNaN( characterSpellSlot5) || isNaN( characterSpellSlot6)
        || isNaN( characterSpellSlot7) || isNaN( characterSpellSlot8) || isNaN( characterSpellSlot9)

      ) {
        return res.json({
          error: 'character Spell Save DC must be a number'
        });
      }

    const characterData = {
      characterSpellSlot1, characterSpellSlot2, characterSpellSlot3,
			characterSpellSlot4, characterSpellSlot5, characterSpellSlot6, characterSpellSlot7,
		  characterSpellSlot8, characterSpellSlot9
    };

    const updateGeneralStats = await CreateCharacterSchema.findByIdAndUpdate(
      characterId,
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

//Creates a new spell
router.post('/UpdateSpells/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { characterSpellName, characterSpellLevel,
      characterSpellCastTime, characterSpellRangeArea,
			characterSpellDescription, characterSpellDuration,
			characterSpellSave, characterSpellSchool, characterSpellDamage } = req.body; 

    const characterData = { characterId: characterId, characterSpellName: characterSpellName,
      characterSpellLevel: characterSpellLevel, characterSpellCastTime: characterSpellCastTime,
      characterSpellRangeArea: characterSpellRangeArea, characterSpellDescription: characterSpellDescription,
      characterSpellDuration: characterSpellDuration, characterSpellSave: characterSpellSave, 
      characterSpellSchool: characterSpellSchool, characterSpellDamage: characterSpellDamage} 

    const update = await CreateCharacterSpellSchema.create(
      characterData
    );

    if (!update) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newSpells: update
    });
  } catch (error) {
    console.log(error)
  }
})

//Deletes a spell
router.delete('/DeleteSpell/:id', async (req, res) => {
  try{
    const { id } = req.params;
  
    const deleted = await CreateCharacterSpellSchema.findByIdAndDelete(id);
    if (!deleted) {
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

//Updates a spell
router.put('/ChangeSpells/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {  characterSpellName, characterSpellLevel,
      characterSpellCastTime, characterSpellRangeArea,
			characterSpellDescription, characterSpellDuration,
			characterSpellSave, characterSpellSchool, characterSpellDamage } = req.body; 

    const characterData = {  characterSpellName, characterSpellLevel,
      characterSpellCastTime, characterSpellRangeArea,
			characterSpellDescription, characterSpellDuration,
			characterSpellSave, characterSpellSchool, characterSpellDamage } 

    const update = await CreateCharacterSpellSchema.findByIdAndUpdate(
      id,
      {
        $set: characterData
      },
      { new: true }
    );

    if (!update) {
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



module.exports = router;