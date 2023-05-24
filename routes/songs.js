const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const { Song, validate } = require('../models/song');
const { Artist } = require('../models/artist');
const { Genre } = require('../models/genre');
const { User } = require('../models/user');
const router = express.Router();

//Lijst van alles liedjes
router.get('/', async (req, res) => {
  const songs = await Song.find().sort('title');
  res.send(songs);
});

//Voeg nieuw liedje toe
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const artist = await Artist.findById(req.body.artistId);
  if (!artist) return res.status(400).send('Invalid artist.');

  let song = await Song.findOne({ title: req.body.title });
  if (song) res.status(400).send('Song already exists. ');

  song = new Song({
    title: req.body.title,
    genre: {
        _id: genre._id,
        name: genre.name
    },
    artist: {
        _id : artist._id ,   
        name: artist.name,
        birthdate: artist.birthdate,
        country: artist.country
    },
    album: req.body.album,
    songtext: req.body.songtext,
    releaseDate: req.body.releaseDate,
    duration: req.body.duration
  });
  song = await song.save();
  
  res.send(song);
});

//Liedje bijwerken
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const artist = await Artist.findById(req.body.artistId);
  if (!artist) return res.status(400).send('Invalid artist.');

  

   const song = await Song.findByIdAndUpdate(req.params.id, 
    { 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        artist: {
            _id : artist._id ,   
            name: artist.name,
            birthdate: artist.birthdate,
            country: artist.country
        },
        album: req.body.album,
        songtext: req.body.songtext,
        releaseDate: req.body.releaseDate,
        duration: req.body.duration
    }, {
    new: true
  });

  if (!song) return res.status(404).send('The song with the given ID was not found.');
  
  res.send(song);
});

//Liedje verwijderen
router.delete('/:id', [auth, admin], async (req, res) => {
  const song = await Song.findByIdAndRemove(req.params.id);

  if (!song) return res.status(404).send('The song with the given ID was not found.');

  res.send(song);
});

//Liedje opvragen
router.get('/:id', async (req, res) => {
  const song = await Song.findById(req.params.id);

  if (!song) return res.status(404).send('The song with the given ID was not found.');

  res.send(song);
});

//Alle liedjes van specifieke genre
router.get('/genres/:genreId', async (req, res) => {
    const genreId = req.params.genreId;
  
    // Zoek het genre op basis van het genreId
    const genre = await Genre.findById(genreId);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    // Zoek alle nummers van het specifieke genre
    const songs = await Song.find({ 'genre._id': genreId });
  
    res.send(songs);
  });

//Alle liedjes specifieke artiest
router.get('/artists/:artistId', async (req, res) => {
    const artistId = req.params.artistId;
  
    // Zoek de artiest op basis van het artistId
    const artist = await Artist.findById(artistId);
    if (!artist) return res.status(404).send('The artist with the given ID was not found.');
  
    // Zoek alle nummers van een specifieke artiest
    const songs = await Song.find({ 'artist._id': artistId });
  
    res.send(songs);
  });

module.exports = router;