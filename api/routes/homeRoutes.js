const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken')

const { hashedPassword, comparePassword } = require('../helpers/auth')
const RegisterSchema = require('../models/RegisterSchema');
const { default: toast } = require('react-hot-toast');
const { json } = require('react-router-dom');

//cors middleware to resolve cors issues
router.use(
	cors({
			credentials: true,
			origin: 'http://localhost:3000'
	})
)


router.put('/AccountEdit', async (req, res) => {
  try {
    const { firstName, email, password, id } = req.body;
    const hashPassword = await hashedPassword(password);

    const updateUserDetails = await RegisterSchema.findByIdAndUpdate(
      id,
      {
        $set: { email: email, firstName: firstName, password: hashPassword }, 
      },
      { new: true }
    );

    if (!updateUserDetails) {
      return res.json({
        error: 'Error updating user data',
      });
    }

    res.json({
      success: true,
      user: updateUserDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
