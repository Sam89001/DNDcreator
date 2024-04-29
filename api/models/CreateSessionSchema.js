const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  sessionName: {
    type: String,
    required: true,
  },
  sessionImage: {
    type: String,
  },
  sessionBackgrounds: {
    type: [String]
  }
})

module.exports = mongoose.model('CreateSessionSchema', CreateSessionSchema)