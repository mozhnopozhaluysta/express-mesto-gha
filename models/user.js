const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено обязательно'],
      minlength: [2, 'Минимальная длина вводимых символов для поля "name" - 2'],
      maxlength: [
        30,
        'Максимальная длина вводимых символов для поля "name" - 30',
      ],
    },
    about: {
      type: String,
      required: [true, 'Поле "about" должно быть заполнено обязательно'],
      minlength: [
        2,
        'Минимальная длина вводимых символов для поля "about" - 2',
      ],
      maxlength: [
        30,
        'Максимальная длина вводимых символов для поля "about" - 30',
      ],
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message:
          'Введенный URL адрес некорректный, повторите пожалуйста попытку ввода еще раз',
      },
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
