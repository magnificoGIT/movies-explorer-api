const BadRequestError = require('../utils/errors/BadRequest');
const ForbiddenError = require('../utils/errors/Forbidden');
const NotFoundError = require('../utils/errors/NotFound');
const UnauthorizedError = require('../utils/errors/Unauthorized');
const internalServer = require('../utils/errors/internalServer');

module.exports = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  internalServer(err, res);

  next();
};
