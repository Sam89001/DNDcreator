const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer')
const fs = require('fs');
const path = require('path'); 

const CreateSessionSchema = require('../models/CreateSessionSchema');

//Load all characters
router.get('/', async (req, res) => {
  try {
		const userId = req.query.userId; 
    const CreateSession = await CreateSessionSchema.find({ userId });
    res.json(CreateSession);

  } catch (error) {
    console.error('Error fetching character data:', error);
    return res.json({
      error: 'Internal server error'
    });
  }
})

//Initial Creation of character
router.post('/CreateNewSession', async (req, res) => {
	try {
		const {sessionName, id} = req.body

  //Validation
		if (!sessionName || sessionName.trim() === '') {
			return res.json({
				error: 'Please include a character name'
			})
		}

		const createSession = await CreateSessionSchema.create({
			sessionName,
			userId: id
		});

		res.json({ mongoId: createSession._id });

	} catch (error) {
		console.log(error)
	}
  
})

module.exports = router;