const movieRouter = require('express').Router();
const {
  retrieveSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieSchema,
  deleteMovieSchema,
} = require('../middlewares/validations');

movieRouter.get('/', retrieveSavedMovies);

movieRouter.post('/', createMovieSchema, createMovie);

movieRouter.delete('/:_id', deleteMovieSchema, deleteMovie);

module.exports = movieRouter;
