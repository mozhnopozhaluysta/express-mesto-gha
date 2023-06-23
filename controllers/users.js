const User = require('../models/user');

const { SUCCESS_CODE } = require('../utils/constants');
const { CREATED_CODE } = require('../utils/constants');
const { BAD_REQUEST_CODE } = require('../utils/constants');
const { NOT_FOUND_CODE } = require('../utils/constants');
const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

// Получение всех пользователей из базы данных
module.exports.getUsersInfo = (_, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(INTERNAL_SERVER_ERROR)
      .send({
        message:
            'На сервере произошла ошибка',
      }));
};

// Пользователь по его уникальному ID
module.exports.getUserInfoId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_CODE).send({
          message: 'Передача некорректных данных при поиске пользователя',
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Пользователь c указанным _id не найден',
        });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({
          message:
            'На сервере произошла ошибка',
        });
    });
};

// Создание нового пользователя
module.exports.createUserInfo = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({
          message:
            'Передача некорректных данных при создания нового пользователя.',
        });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({
            message:
              'На сервере произошла ошибка',
          });
      }
    });
};

// Редактирование аватара пользователя
module.exports.updateProfileUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Данный пользователь не был найден',
        });
      }

      if (err.name === 'ValidationError') {
        const validationErrors = Object.values(err.errors).map((error) => error.message);
        return res.status(BAD_REQUEST_CODE).send({
          message: 'Передача некорректных данных при попытке обновления аватара',
          validationErrors,
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

// Редактирование информации профиля пользователя
module.exports.editProfileUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Данный пользователь не был найден',
        });
      }

      if (err.name === 'ValidationError') {
        const validationErrors = Object.values(err.errors).map((error) => error.message);
        return res.status(BAD_REQUEST_CODE).send({
          message: 'Передача некорректных данных при попытке обновления профиля',
          validationErrors,
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: 'На сервере произошла ошибка',
      });
    });
};
