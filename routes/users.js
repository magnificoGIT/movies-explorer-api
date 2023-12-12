const userRouter = require('express').Router();
const { getCurrentUser, updateUserData } = require('../controllers/users');
const { userUpdateSchema } = require('../middlewares/validations');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', userUpdateSchema, updateUserData);

module.exports = userRouter;
