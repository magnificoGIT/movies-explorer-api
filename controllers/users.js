const User = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequest');
const NotFoundError = require('../utils/errors/NotFound');
const { OK_200 } = require('../utils/httpStatusConstants');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Данный пользователь не найден'))
    .then((user) => res.status(OK_200).send({ name: user.name, email: user.email }))
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Данный пользователь не найден'))
    .then((user) => {
      res.status(OK_200).send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateUserData,
};
