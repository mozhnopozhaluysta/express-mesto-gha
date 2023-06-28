const Card = require('../models/card');

const { CREATED_CODE } = require('../utils/constants');

const CustomAccessDeniedError = require('../errors/CustomAccessDeniedError');

const CustomNotFoundCode = require('../errors/CustomNotFoundCode');

const CustomInvalidDataError = require('../errors/CustomInvalidDataError');

// Вывод массива карточек а страницу
function getInitialCards(_, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

// Добавление новой карточки на страницу
function addNewCard(req, res, next) {
  const { name, link } = req.body;
  const { userId } = req.user;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(CREATED_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new CustomInvalidDataError(
            'Передача некорректных данных, при попытке добавления новой карточки на страницу.',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Удаление карточки из массива
function removeCard(req, res, next) {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card.findById({
    _id: cardId,
  })
    .then((card) => {
      if (!card) {
        throw new CustomNotFoundCode('Карточка c передаваемым ID не найдена');
      }

      const { owner: cardOwnerId } = card;

      if (cardOwnerId.valueOf() !== userId) {
        throw new CustomAccessDeniedError('Нет прав доступа');
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new CustomNotFoundCode('Данная карточка была удалена');
      }

      res.send({ data: deletedCard });
    })
    .catch(next);
}

// Постановка лайка на карточку
function addLike(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
        likes: userId,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new CustomNotFoundCode('Карточка с данным ID не найдена');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new CustomInvalidDataError(
            'Передача некорректных данных при попытке поставить лайк.',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Удаление лайка с карточки
function removeLike(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes: userId,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new CustomNotFoundCode('Карточка c передаваемым ID не найдена');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new CustomInvalidDataError(
            'Передача некорректных данных при попытке удаления лайка с карточки.',
          ),
        );
      } else {
        next(err);
      }
    });
}

module.exports = {
  getInitialCards,
  addNewCard,
  removeCard,
  addLike,
  removeLike,
};
