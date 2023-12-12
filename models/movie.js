const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./user');

const moviesSchema = new mongoose.Schema({
  country: {
    required: [true, 'Поле "country" обязательно для заполнения'],
    type: String,
  },
  director: {
    required: [true, 'Поле "director" обязательно для заполнения'],
    type: String,
  },
  duration: {
    required: [true, 'Поле "duration" обязательно для заполнения'],
    type: Number,
  },
  year: {
    required: [true, 'Поле "year" обязательно для заполнения'],
    type: String,
  },
  description: {
    required: [true, 'Поле "description" обязательно для заполнения'],
    type: String,
  },
  image: {
    required: [true, 'Поле "image" обязательно для заполнения'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is not a valid URL for image`,
    },
  },
  trailerLink: {
    required: [true, 'Поле "trailerLink" обязательно для заполнения'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is not a valid URL for trailer`,
    },
  },
  thumbnail: {
    required: [true, 'Поле "thumbnail" обязательно для заполнения'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is not a valid URL for thumbnail`,
    },
  },
  owner: {
    required: [true, 'Поле "owner" обязательно для заполнения'],
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  movieId: {
    required: [true, 'Поле "movieId" обязательно для заполнения'],
    type: Number,
  },
  nameRU: {
    required: [true, 'Поле "nameRU" обязательно для заполнения'],
    type: String,
  },
  nameEN: {
    required: [true, 'Поле "nameEN" обязательно для заполнения'],
    type: String,
  },
});

module.exports = mongoose.model('movies', moviesSchema);
