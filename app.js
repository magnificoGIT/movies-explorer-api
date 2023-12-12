require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { MONGO_URI, PORT } = require('./config');
const NotFoundError = require('./utils/errors/NotFound');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
    ],
    credentials: true, // Разрешаем отправку куки и авторизационных заголовков
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URI);

app.use(requestLogger);

app.use('/', require('./routes/auth'));

app.use('/', require('./routes/index'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('Ошибка пути'));
});

app.use(errorLogger);

app.use(errors());

// Централизованный обработчик ошибок
app.use(require('./middlewares/centralizedErrorHandler'));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
