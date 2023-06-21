// Подключение необходимых модулей и файлов
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const routes = require('./routes/router');

// Определение порта из переменной окружения или использование значения по умолчанию
const { PORT = 3000 } = process.env;

// Создание экземпляра приложения Express
const app = express();

// Применение промежуточного ПО для обеспечения безопасности
app.use(helmet());

// Отключение заголовка "x-powered-by"
app.disable('x-powered-by');

// Парсинг JSON-запросов
app.use(express.json());

// Установка значения для свойства "user" в объекте "req"
app.use((req, res, next) => {
  req.user = {
    _id: '6492ce9bb6611714e33e4b48', /* {
      "name": "Toma Bushtaeva",
      "about": "Фронтенд разработчик",
      "avatar": "https://cdn2.riastatic.com/photosnew/auto/photo/bmw_m6__473851217f.jpg"
      } Данные пользователя созданы через POSTMAN успешно присвоен уникальный id пользователя */
  };
  next();
});

// Подключение маршрутов
app.use(routes);

// Подключение к базе данных MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удается подключиться к БД, проверьте правильность подключения');
  });

// Запуск сервера на указанном порту
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
