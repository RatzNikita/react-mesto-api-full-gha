const Card = require('../models/card');
const { handleException } = require('../exceptions/exceptions');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      card.populate('owner').then((crd) => res.status(201).send(crd));
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        handleException({ name: 'NotFound' }, req, res);
      } else if (card.owner.equals(req.user._id)) {
        card.deleteOne().then(() => res.send({ message: 'Пост удалён' }));
      } else {
        handleException({ name: 'NotPermissions' }, req, res);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true, runValidators: true },
)
  .populate('owner')
  .populate('likes')
  .then((cards) => {
    if (!cards) {
      handleException({ name: 'NotFound' }, req, res);
    } else {
      res.send(cards);
    }
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true, runValidators: true },
)
  .populate('owner')
  .populate('likes')
  .then((cards) => {
    if (!cards) {
      handleException({ name: 'NotFound' }, req, res);
    } else {
      res.send(cards);
    }
  })
  .catch(next);
