const { RateLimiterMemory } = require('rate-limiter-flexible');
const { TOO_MANY_REQUESTS_429 } = require('../utils/httpStatusConstants');

const opts = {
  points: 5,
  duration: 10,
};

const rateLimiter = new RateLimiterMemory(opts);

const handleRequest = (req, res, next) => {
  const remoteAddress = req.ip;

  rateLimiter.consume(remoteAddress, 1)
    .then(() => next())
    .catch(() => res.status(TOO_MANY_REQUESTS_429).send({ message: 'Слишком много запросов с вашего IP-адресса' }));
};

module.exports = { handleRequest };
