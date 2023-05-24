const Joi = require('joi');
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  birthdate: {
    type: String,
    required: true, 
    minlength: 6,
    maxlength: 50
  },
  country: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Artist = mongoose.model('Artist', artistSchema);

function validateArtist(artist) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    birthdate: Joi.string().required(),
    country: Joi.string().required()
  });

  return schema.validate(artist);
}

exports.artistSchema = artistSchema;
exports.Artist = Artist; 
exports.validate = validateArtist;