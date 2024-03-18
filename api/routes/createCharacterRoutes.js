const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer')
const fs = require('fs');
const path = require('path'); 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads/')); // Adjust the path as needed
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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

//Delete A Character
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
      CreateCharacterOrganisationSchema.deleteMany(query)
    ];

    await Promise.all(deleteOperations);

    return res.json({ success: 'Successfully deleted character data' });
  } catch (error) {
    console.error('Error deleting character data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


//Page Navigation
router.get('/NextPage/:sentId', async (req, res) => {
  try {
    const sentId = req.params.sentId; 
    const characterId = await CreateCharacterSchema.findById(sentId);

    if (!characterId) {
      return res.json({
        error: 'Error in navigation',
      });
    }

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
    const LoadTreasure = await CreateCharacterTreasureSchema.find({ characterId: sentId })
    const LoadOrganisation = await CreateCharacterOrganisationSchema.find({ characterId: sentId })

    if (!LoadCharacters) {
      return res.json({
        error: 'No characters found with the specified ID'
      });
    }
    const responseData = {
      character: LoadCharacters,
      spells: LoadSpells,
      treasure: LoadTreasure,
      organisation: LoadOrganisation
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
        isNaN(characterXp) || isNaN(characterInspiration) ||
        isNaN(characterProficiencyBonus) || isNaN(characterPerception) 
      ) {
        return res.json({
          error: 'character Hp, AC, Level, Speed, XP, Inspiration, Proficiency Bonus and Perception must be numbers'
        });
      }

      if (characterAc.length > 4 || characterHp.length > 5 || characterLevel.length > 4
        || characterInspiration.length > 4 || characterInspiration.length > 4 || characterProficiencyBonus.length > 4 ||
        characterPerception.length > 4)
        {
          return res.json({
            error: 'character Hp, AC, Level, Inspiration, Proficiency Bonus and Perception must not leave boundaries'
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

      if ( characterStrength.length > 3 || characterDexterity.length > 3 || characterConstitution.length > 3 ||
        characterIntelligence.length > 3 || characterWisdom.length > 3 || characterCharisma.length > 3
      ){
        return res.json({
          error: 'Skills must not exceed 3 digits',
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

      if (characterSpellSlot1.length > 4 || characterSpellSlot2.length > 4 || characterSpellSlot3.length > 4 || 
        characterSpellSlot4.length > 4 || characterSpellSlot5.length > 4 || characterSpellSlot6.length > 4 ||
        characterSpellSlot7.length > 4 || characterSpellSlot8.length > 4 || characterSpellSlot9.length > 4
        ) {
          return res.json({
            error: 'character Spell Slots cannot exceed 4 numbers'
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

      if (characterSpellName === "" || characterSpellLevel === "" || characterSpellCastTime === "" ||
      characterSpellDescription === "" || characterSpellDamage === "") {
      return res.json({
        error: 'Please include a Spell Name, Level, Description, and Cast Time',
      });
    }

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

      if (characterSpellName === '' || characterSpellLevel === '' || characterSpellCastTime === '' ||
      characterSpellDescription === '' || characterSpellDamage === '') {
      return res.json({
        error: 'Please include a Spell Name, Level, Description, and Cast Time',
      });
    }
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
      });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates Other General Stats
router.put('/UpdateOtherGeneralStats/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { characterAge, characterHeight, characterWeight,
      characterEyes, characterSkin, characterHair } = req.body;

      if (
        isNaN(characterAge) 
      ) {
        return res.json({
          error: 'character Spell Save DC must be a number'
        });
      }

    const characterData = {
      characterAge, characterHeight, characterWeight,
			  characterEyes, characterSkin, characterHair
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

//Updates Text Appearence
router.put('/UpdateAppearence/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { contentInfo } = req.body;

    characterTextAppearence = contentInfo

    const characterData = {
      characterTextAppearence
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

//Updates Backstory
router.put('/UpdateBackstory/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { contentInfo } = req.body;

    characterBackstory = contentInfo

    const characterData = {
      characterBackstory
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

//Creates Treasure
router.post('/UpdateTreasure/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { characterTreasureName, characterTreasureQuantity,
      characterTreasureDescription } = req.body; 

    const characterData = { characterId: characterId, characterTreasureName: characterTreasureName,
    characterTreasureQuantity: characterTreasureQuantity, characterTreasureDescription: characterTreasureDescription } 

    const update = await CreateCharacterTreasureSchema.create(
      characterData
    );

    if (!update) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newTreasure: update
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates Treasure
router.put('/ChangeTreasure/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterTreasureName, 
      characterTreasureQuantity, 
      characterTreasureDescription } = req.body; 

    const characterData = { characterTreasureName, 
      characterTreasureQuantity, 
      characterTreasureDescription } 

    const update = await CreateCharacterTreasureSchema.findByIdAndUpdate(
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

//Deletes Treasure
router.delete('/DeleteTreasure/:id', async (req, res) => {
  try{
    const { id } = req.params;
  
    const deleted = await CreateCharacterTreasureSchema.findByIdAndDelete(id);
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

//Creates Organisation
router.post('/UpdateOrganisation/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { characterOrganisationName, characterOrganisationDescription } = req.body; 

    const characterData = { characterId: characterId, type: 'Organisation', characterOrganisationName: characterOrganisationName,
      characterOrganisationDescription: characterOrganisationDescription } 

    const update = await CreateCharacterOrganisationSchema.create(
      characterData
    );

    if (!update) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newOrganisation: update
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates Organisation
router.put('/ChangeOrganisation/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterOrganisationName, characterOrganisationDescription } = req.body; 

    const characterData = { characterOrganisationName, characterOrganisationDescription } 

    const update = await CreateCharacterOrganisationSchema.findByIdAndUpdate(
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

//Creates Symbol
router.post('/UpdateSymbol/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { characterOrganisationName, characterOrganisationDescription } = req.body; 

    const characterData = { characterId: characterId, type: 'Symbol', characterOrganisationName: characterOrganisationName,
      characterOrganisationDescription: characterOrganisationDescription } 

    const update = await CreateCharacterOrganisationSchema.create(
      characterData
    );

    if (!update) {
      return res.json({
        error: 'Error updating character data',
      })
    }
    return res.status(200).json({
      success: true,
      newOrganisation: update
    });
  } catch (error) {
    console.log(error)
  }
})

//Updates Symbol
router.put('/ChangeSymbol/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { characterOrganisationName, characterOrganisationDescription } = req.body; 

    const characterData = { characterOrganisationName, characterOrganisationDescription } 

    const update = await CreateCharacterOrganisationSchema.findByIdAndUpdate(
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

//Deletes a Organisation & Symbol
router.delete('/DeleteOrganisation/:id', async (req, res) => {
  try{
    const { id } = req.params;
  
    const deleted = await CreateCharacterOrganisationSchema.findByIdAndDelete(id);
    if (!deleted) {
      return res.json({
        error: 'Error deleting character data',
      })
    }
    return res.json({
      success: 'Successfully deleted character data',
      deletedItemType: deleted
    });

  } catch (error) {
    console.log(error)
  }
})

//Uploads Profile Image
router.put('/UploadProfileImage/:characterId', upload.single('avatar'), async (req, res) => {
  try {
    const { characterId } = req.params;

    if (!req.file) {
      return res.json({ error: true });
    }

    const imageUrl = 'uploads/' + req.file.filename;
    const character = await CreateCharacterSchema.findById(characterId);
    if (!character) {
      return res.json({ error: 'Character not found' });
    }
    const oldImagePath = character.characterProfileImageAddress;

    const updatedCharacter = await CreateCharacterSchema.findByIdAndUpdate(
      characterId,
      { characterProfileImageAddress: imageUrl },
      { new: true }
    );

    if (!updatedCharacter) {
      return res.json({
        error: 'Error updating character'
      });
    }

    if (oldImagePath) {
      fs.unlinkSync(path.join(__dirname, '../../public/', oldImagePath));
    }

    return res.json({
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
});

//Uploads Body Image
router.put('/UploadBodyImage/:characterId', upload.single('avatar'), async (req, res) => {
  try {
    const { characterId } = req.params;

    if (!req.file) {
      return res.json({ error: true });
    }

    const imageUrl = 'uploads/' + req.file.filename;

    const character = await CreateCharacterSchema.findById(characterId);
    if (!character) {
      return res.json({ error: 'Character not found' });
    }
    const oldBodyImagePath = character.characterBodyImageAddress;

    const updatedCharacterImage = await CreateCharacterSchema.findByIdAndUpdate(
      characterId,
      { characterBodyImageAddress: imageUrl },
      { new: true }
    );

    if (!updatedCharacterImage) {
      return res.json({
        error: 'Error uploading Image',
      });
    }

    if (oldBodyImagePath) {
      fs.unlinkSync(path.join(__dirname, '../../public/', oldBodyImagePath));
    }

    return res.json({
      success: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
});


module.exports = router;