require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { default: helmet } = require('helmet');
const { MONGO_URI, PORT } = require('./config');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const notFoundHandler = require('./middlewares/notFoundHandler');
const { handleRequest } = require('./middlewares/rateLimiter');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://filmsmafnifico.nomoredomainsmonster.ru',
    ],
    credentials: true, // Разрешаем отправку куки и авторизационных заголовков
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URI);

app.use(helmet());

// Защита запросов
app.use(requestLogger);

app.use(handleRequest);

app.use('/', require('./routes/auth'));

app.use('/', require('./routes/index'));

app.use(notFoundHandler);

app.use(errorLogger);

app.use(errors());

// Централизованный обработчик ошибок
app.use(require('./middlewares/centralizedErrorHandler'));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
