// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('./validationConstants');

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .length(24)
      .hex()
      .required(),
  }),
});

const postCardValidation = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegex),
  },
});

const updateProfileValidation = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },
});

const updateAvatarValidation = celebrate({
  body: {
    avatar: Joi.string().required().regex(urlRegex),
  },
});

const createUserValidation = celebrate({
  body: {
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2).max(30),
  },
});

const loginValidation = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  },
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .length(24)
      .hex()
      .required(),
  }),
});

module.exports = {
  cardIdValidation,
  postCardValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createUserValidation,
  loginValidation,
  userIdValidation,
};
