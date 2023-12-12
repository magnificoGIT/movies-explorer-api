const { celebrate, Joi } = require('celebrate');

const userUpdateSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const createMovieSchema = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().required().integer(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieSchema = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const signUpSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signInSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  userUpdateSchema,
  createMovieSchema,
  deleteMovieSchema,
  signUpSchema,
  signInSchema,
};
