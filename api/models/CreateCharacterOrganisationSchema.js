const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateCharacterOrganisationSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
	characterOrganisationName: {
    type: String,
    required: true,
  },
  characterOrganisationDescription: {
    type: String,
    required: true,
  },
  
})

module.exports = mongoose.model('CreateCharacterOrganisationSchema', CreateCharacterOrganisationSchema)