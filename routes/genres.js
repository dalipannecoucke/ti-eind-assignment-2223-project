const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

//Haal alle genres op
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

//Voeg een nieuw genre toe
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findOne({ name: req.body.name });
  if (genre) res.status(400).send('Genre already exists. ');

  genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
});

//Bewerk een bestaand genre via ID
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

//Verwijder een genre
router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

//Vraag een specifiek genre op via ID
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;