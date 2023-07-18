/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handleException } = require('./exceptions/exceptions');
const { createUserValidation, loginValidation } = require('./validation/celebrateSchemas');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 250,
});

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(requestLogger);

app.use('/signin', loginValidation, login);
app.use('/signup', createUserValidation, createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => {
  handleException({ name: 'PageNotFound' }, req, res);
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  handleException(err, req, res, next);
});

app.listen(PORT);
