const NotFoundError = require('../utils/errors/NotFound');

const notFoundHandler = (req, res, next) => {
  next(new NotFoundError('Ошибка пути'));
};

module.exports = notFoundHandler;
