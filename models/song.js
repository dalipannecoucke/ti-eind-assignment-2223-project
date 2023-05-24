const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const {artistSchema} = require('./artist');

const Song = mongoose.model('Song', new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true, 
      minlength: 3,
      maxlength: 255
    },
    genre: { 
      type: genreSchema,  
      required: true
    },
    artist: { 
        type: artistSchema,  
        required: true
    },
    album: { 
      type: String, 
      required: false,
      min: 3,
      max: 255
    },
    songtext: { 
      type: String, 
      required: true,
      min: 5,
      max: 1000000
    },
    releaseDate: { 
      type: String, 
      required: true
    },
    duration: { 
      type: String, 
      required: true
    },
    favoritedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }));

  function validateSong(song) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(50).required(),
      genreId: Joi.objectId().required(),
      artistId: Joi.objectId().required(),
      album: Joi.string().min(0),
      songtext: Joi.string().min(5).required(),
      releaseDate: Joi.string().required(),
      duration: Joi.string().required()
    });
  
    return schema.validate(song);
  }
  
  exports.Song = Song; 
  exports.validate = validateSong;