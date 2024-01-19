const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');

const CreateCharacterSchema = require('../models/CreateCharacterSchema');

router.get('/', async (req, res) => {
  try {
    const characterId = '65a7fe22a35046f872249a23';
    const LoadCharacters = await CreateCharacterSchema.findById(characterId);

    if (!LoadCharacters) {
      return res.status(404).json({ error: 'No characters to load' });
    }

    res.json(LoadCharacters);
  } catch (error) {
    console.error('Error fetching character data:', error);
    res.status(500).json({ error: 'Internal server error' });
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