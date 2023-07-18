/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const {
  createCard, dislikeCard, getCards, likeCard, removeCard,
} = require('../controllers/cards');
const { cardIdValidation, postCardValidation } = require('../validation/celebrateSchemas');

router.get('', getCards);
router.post('', postCardValidation, createCard);
router.delete('/:cardId', cardIdValidation, removeCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
