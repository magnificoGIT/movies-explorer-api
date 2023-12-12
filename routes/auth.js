const authRouter = require('express').Router();
const { createUser, login } = require('../controllers/auth');
const { signUpSchema, signInSchema } = require('../middlewares/validations');

authRouter.post('/signup', signUpSchema, createUser);

authRouter.post('/signin', signInSchema, login);

module.exports = authRouter;
