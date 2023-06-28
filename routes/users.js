const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { emailPattern } = require('../utils/constants');
const {
  getUsersInfo,
  getUserId,
  getUserInfo,
  editProfileUserInfo,
  updateProfileUserAvatar,
} = require('../controllers/users');

// Пользователи:
router.get('/', getUsersInfo);

// Пользователь
router.get('/me', getUserInfo);

// Конкретный пользователь по его ID:
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserId,
);

// Редактирование данных пользователя:
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  editProfileUserInfo,
);

// Редактирование аватара пользователя:
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(emailPattern),
    }),
  }),
  updateProfileUserAvatar,
);

module.exports = router;
