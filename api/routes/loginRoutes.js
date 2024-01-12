const express = require('express');
const cors = require('cors');
const router = express.Router();

//import models
const RegisterSchema = require('../models/RegisterSchema');

//cors middleware to resolve cors issues
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/', (req, res) => {
    res.json('working!!!')
})

//Register

// '/' is likely to be where the issue is
router.post('/', async (req, res) => {
    try {
      const {email, firstName, password} = req.body;

			//Database Verification

			if (!email) {
				return res.json({
					error: 'email is required'
				})
			}

			if (!password || password.length < 4) {
				return res.json({
					error: 'password is required and should be more than 4 characters long'
				})
			}
			
			//check is email already exists
			const existingEmail = await RegisterSchema.findOne({email})
			if (existingEmail = true) {
				return res.json({
					error: 'email already taken'
				})
			}

			//Submit User

			const user = await RegisterSchema.create({
				email, firstName, password
			})

			return res.json(user)

    } catch (error) {
      console.log(error)
    }
})

module.exports = router;
