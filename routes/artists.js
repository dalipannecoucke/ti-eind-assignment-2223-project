const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const { Artist, validate } = require('../models/artist');
const router = express.Router();

//Haal alle artiesten op
router.get('/', async (req, res) => {
  const artists = await Artist.find().sort('name');
  res.send(artists);
});

//Voeg een nieuwe artiest toe
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let artist = await Artist.findOne({ name: req.body.name });
  if (artist) res.status(400).send('Artist already exists. ');

  artist = new Artist({
    name: req.body.name,
    birthdate: req.body.birthdate,
    country: req.body.country
  });
  
  artist = await artist.save();
  
  res.send(artist);
});

//Artiest bijwerken
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const artist = await Artist.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

  if (!artist) {
    return res.status(404).send('The artist with the given ID was not found.');
  }
  
  res.send(artist);
});


//Artiest verwijderen
router.delete('/:id', [auth, admin], async (req, res) => {
  const artist = await Artist.findByIdAndRemove(req.params.id);

  if (!artist) return res.status(404).send('The artist with the given ID was not found.');

  res.send(artist);
});

//Artiest opvragen
router.get('/:id', async (req, res) => {
  const artist = await Artist.findById(req.params.id);

  if (!artist) return res.status(404).send('The artist with the given ID was not found.');

  res.send(artist);
});

module.exports = router;