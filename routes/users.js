const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const Song = require('../models/song').Song;
const {songs} = require('../models/song');
const { populate } = require('mongoose/lib/utils');

//Registreer gebruiker
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(400).send('User already registered. ');
    user = new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10); //number of rounds
    user.password = await bcrypt.hash('req.body.hash', salt);

    await user.save();
    //res.send(_.pick(user, ['_id','name', 'email']));

    //const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));
});

//Gebruiker verwijderen
router.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
  });

//Toevoegen van favoriet liedje voor gebruiker
router.post('/favorites/:songId', auth, async (req, res) => {
    const userId = req.user._id;
    const songId = req.params.songId;
  
    try {
      // Controleer of het liedje bestaat
      const song = await Song.findById(songId);
      if (!song) {
        return res.status(404).send('The song with the given ID was not found.');
      }
  
      // Zoek de gebruiker op basis van het userId
      const user = await User.findById(userId).populate('favorites')
      if (!user) {
        return res.status(404).send('The user with the given ID was not found.');
      }
  
      // Controleer of het liedje al aan favorieten is toegevoegd
      if (user.favorites.includes(songId)) {
        return res.status(400).send('The song is already in favorites.');
      }
  
      // Voeg het liedje toe aan de favorieten van de gebruiker
      user.favorites.push(song);
      song.favoritedBy.push(userId);
      await user.save();
  
      res.send(user.favorites);
    } catch (error) {
      console.log(error);
      res.status(500).send('Something went wrong.');
    }
  });


//Haal favoriete liedjes op voor gebruiker
router.get('/favorites', auth, async (req, res) => {
  const userId = req.user._id;

  try {
    // Zoek de gebruiker op basis van het userId en haal de favoriete liedjes op
    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).send('The user with the given ID was not found.');
    }

    res.send(user.favorites);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong.');
  }
});


//Endpoint om een liedje uit favorieten te verwijderen
router.delete('/favorites/:songId', auth, async (req, res) => {
  const userId = req.user._id;
  const songId = req.params.songId;

  try {
    // Zoek de gebruiker op basis van het userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('The user with the given ID was not found.');
    }

    // Controleer of het liedje aan favorieten is toegevoegd
    if (!user.favorites.includes(songId)) {
      return res.status(400).send('The song is not in favorites.');
    }

    // Verwijder het liedje uit de favorieten van de gebruiker
    user.favorites.pull(songId);
    
    await user.save();

    res.send(user.favorites);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong.');
  }
})
    

module.exports = router;