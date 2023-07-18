/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {errors} = require('celebrate');
const rateLimit = require('express-rate-limit');
const {requestLogger, errorLogger} = require('./middlewares/logger');
const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');
const {handleException} = require('./exceptions/exceptions');
const {createUserValidation, loginValidation} = require('./validation/celebrateSchemas');

let {NODE_ENV, PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb',ALLOWED_CORS } = process.env;

mongoose.connect(DB_URL);

if(NODE_ENV === 'production') {
   ALLOWED_CORS = [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'localhost:3000'
  ];
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 250,
});

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(limiter);
app.use(requestLogger);

app.use((req, res, next) => {
  const {origin} = req.headers;
  const {method} = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  if (NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', '*')
  }
  next();
});

app.use('/signin', loginValidation, login);
app.use('/signup', createUserValidation, createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => {
  handleException({name: 'PageNotFound'}, req, res);
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  handleException(err, req, res, next);
});

app.listen(PORT);
