const express = require('express');
const cors = require('cors');
const router = express.Router();
const { hashedPassword, comparePassword } = require('../helpers/auth')

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
})

router.get('/Login', (req, res) => {
})

//Register

router.post('/', async (req, res) => {
    try {
      const {email, firstName, password} = req.body;

			//Database Verification

			if (!email || !firstName) {
				return res.json({
					error: 'email and name are required'
				})
			}

			if (!password || password.length < 4) {
				return res.json({
					error: 'password is required and should be more than 4 characters long'
				})
			}
			
			//check is email already exists
			const existingEmail = await RegisterSchema.findOne({email})
			if (existingEmail) {
				return res.json({
					error: 'email already taken'
				})
			}
			//hashed password

			const hashPassword = await hashedPassword(password)

			//Submit User

			const user = await RegisterSchema.create({
				email, 
				firstName, 
				password: hashPassword
			})

			return res.json(user)

    } catch (error) {
      console.log(error)
    }
})

//Login

router.post('/Login', async (req, res) => {
	try {
		const {email, password} = req.body;

		//Look for user
		const user = await RegisterSchema.findOne({email});
		if (!user) {
			return res.json({
				error: 'No user found'
			})
		}

		//check for password
		const match = await comparePassword(password, user.password)
		if(match) {
			res.json('passwords match')
		}
	} catch (error) {
		console.log(error)
	}
})

module.exports = router;
