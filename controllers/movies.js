const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequest');
const ForbiddenError = require('../utils/errors/Forbidden');
const NotFoundError = require('../utils/errors/NotFound');
const { CREATED_201, OK_200 } = require('../utils/httpStatusConstants');

const retrieveSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .sort({ createdAt: -1 })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(CREATED_201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при добавлении фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нельзя удалять фильм, который добавили не вы');
      }
      Movie.deleteOne()
        .then(() => res.status(OK_200).send({ message: 'Нельзя удалять фильм, который добавили не вы' }));
    })
    .catch(next);
};

module.exports = {
  retrieveSavedMovies,
  createMovie,
  deleteMovie,
};
