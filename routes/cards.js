const router = require('express').Router();

const {
  getInitialCards,
  addNewCard,
  removeCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

// Маршрут для получения всех карточек:
router.get('/', getInitialCards);
// Маршрут для создания новой карточки:
router.post('/', addNewCard);
// Маршрут для удаления карточки:
router.delete('/:cardId', removeCard);
// Маршрут для добавления лайка на карточку:
router.put('/:cardId/likes', addLike);
// Маршрут для удаления лайка с карточки:
router.delete('/:cardId/likes', removeLike);

module.exports = router;
