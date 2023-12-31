const rateLimiter = require('express-rate-limit');

// Ограничитель запросов
const limiter = rateLimiter({

  max: 100, // Максимальное количество запросов за указанный период

  windowMS: 60000, // Продолжительность периода в миллисекундах

  // Сообщение, отправляемое при превышении лимита запросов
  message: 'Превышено количество запросов на сервер. Попробуйте повторить немного позже',
});

module.exports = limiter; // Экспортируем ограничитель запросов
