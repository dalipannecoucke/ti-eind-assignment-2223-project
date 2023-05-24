const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const genres = require('./routes/genres');
/*
const customers = require('./routes/customers');
const books = require('./routes/books');
const rentals = require('./routes/rentals');
*/
const users = require('./routes/users');
const artists = require('./routes/artists');
const songs = require('./routes/songs');
const auth = require('./routes/auth');


const config = require('config');
const express = require('express');
const { artistSchema } = require('./models/artist');
const app = express();


if (!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey not defined');
  process.exit(1);
}

mongoose.connect('mongodb://127.0.0.1/songbook')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
//...
app.use('/api/users', users);
app.use('/api/genres', genres);
app.use('/api/auth', auth);
app.use('/api/artists', artists);
app.use('/api/songs', songs);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));