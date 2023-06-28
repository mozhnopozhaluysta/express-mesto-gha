// импорт ошибки 500 из утилса
const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

// Middleware для обработки ошибок
const errorHandler = (err, _, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR; // Определяем статус код ошибки

  // Определяем сообщение об ошибке в зависимости от статус кода
  const message = statusCode === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ message }); // Отправляем ответ с указанным статус кодом
  // и сообщением об ошибке
  next(); // Передаем управление следующему middleware или обработчику маршрута
};

// Экспортируем middleware функцию
module.exports = errorHandler;
