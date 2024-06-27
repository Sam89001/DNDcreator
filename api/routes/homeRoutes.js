const express = require('express');
const cors = require('cors');
const router = express.Router();

const { hashedPassword, comparePassword } = require('../helpers/auth')
const RegisterSchema = require('../models/RegisterSchema');

router.use(
	cors({
			credentials: true,
			origin: 'https://dndcreator.netlify.app' 
      //|| 'http://localhost:3000'
	})
);



router.put('/AccountEdit', async (req, res) => {
  try {
    const { firstName, email, password, id } = req.body;

    if (password && password.length < 4) {
      return res.json({
        error: 'Password should be more than 4 characters long',
      });
    }

    const existingUser = await RegisterSchema.findById(id);

    if (existingUser && existingUser.email !== email) {
      return res.json({
        error: 'Email already exists',
      });
    }

    const updatedEmail = email.trim() === '' ? existingUser.email : email;
    const updatedUsername = firstName.trim() === '' ? existingUser.firstName : firstName;

    const updateFields = {};

    if (email !== undefined) {
      updateFields.email = updatedEmail;
    }
    if (firstName !== undefined) {
      updateFields.firstName = updatedUsername;
    }
    if (password !== undefined && password !== '') {
      updateFields.password = await hashedPassword(password);
    }

    const updateUserDetails = await RegisterSchema.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    if (!updateUserDetails) {
      return res.json({
        error: 'Error updating user data',
      });
    }

    return res.json({
      success: true,
      user: updateUserDetails,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
