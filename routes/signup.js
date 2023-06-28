const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { emailPattern } = require('../utils/constants');
const { registrationUser } = require('../controllers/users');

// Маршрут для регистрации нового пользователя
router.post(
  '/signup',
  celebrate({
    // Проверка входящих данных с использованием celebrate и Joi
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(emailPattern),
    }),
  }),
  registrationUser,
);

module.exports = router; // Экспорт роутера
