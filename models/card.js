const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
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
    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message:
          'Введенный URL адрес некорректный, повторите пожалуйста попытку ввода еще раз',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
