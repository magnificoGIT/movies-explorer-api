require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const { SALT_ROUNDS } = require('../utils/constants');
const { OK_200, CREATED_201 } = require('../utils/httpStatusConstants');
const StatusConflictError = require('../utils/errors/StatusConflict');
const BadRequestError = require('../utils/errors/BadRequest');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  console.log(email, password, name);

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => {
      res.status(CREATED_201).send({
        email,
        name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new StatusConflictError('Данный пользователь уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        console.log(err);
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.status(OK_200).send({ token });
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
