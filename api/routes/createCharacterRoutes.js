const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');

const CreateCharacterSchema = require('../models/CreateCharacterSchema');

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

router.get('/:characterId', async (req, res) => {
  try {
    const characterId = req.params.characterId; 
    const LoadCharacters = await CreateCharacterSchema.findById(characterId);

    if (!LoadCharacters) {
      return res.json({
        error: 'No characters found with the specified ID'
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

router.post('/:id', async (req, res) => {
    
})


module.exports = router;