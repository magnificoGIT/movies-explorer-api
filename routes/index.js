const rootRouter = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authProtection = require('../middlewares/authProtection');

rootRouter.use(authProtection);

rootRouter.use('/users', userRouter);
rootRouter.use('/movies', movieRouter);

module.exports = rootRouter;
