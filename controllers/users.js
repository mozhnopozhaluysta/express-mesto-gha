const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { CREATED_CODE } = require('../utils/constants');

const { CONFIDENTIAL_KEY } = require('../utils/constants');

const CustomAuthenticationError = require('../errors/CustomAuthenticationError');

const CustomNotFoundCode = require('../errors/CustomNotFoundCode');

const CustomDuplicateDataError = require('../errors/CustomDuplicateDataError');

const CustomInvalidDataError = require('../errors/CustomInvalidDataError');

// Регистрация пользователя
function registrationUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(CREATED_CODE).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new CustomDuplicateDataError(
            'Пользователь с данным электронным адресом уже зарегистрирован',
          ),
        );
      } else if (err.name === 'ValidationError') {
        next(
          new CustomInvalidDataError(
            'Передача некорректных данные при регистрации пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Логин пользователя
function loginUser(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign({ userId }, CONFIDENTIAL_KEY, {
          expiresIn: '7d',
        });

        return res.send({ _id: token });
      }

      throw new CustomAuthenticationError('Неправильные почта или пароль');
    })
    .catch(next);
}

// Получение всех пользователей из базы данных
function getUsersInfo(_, res, next) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
}

// Поиск конкретного пользователя по его ID:
function getUserId(req, res, next) {
  const { id } = req.params;

  User.findById(id)

    .then((user) => {
      if (user) return res.send({ user });

      throw new CustomNotFoundCode('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CustomInvalidDataError('Передача некорректного id'));
      } else {
        next(err);
      }
    });
}

// Пользователь
function getUserInfo(req, res, next) {
  const { userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (user) return res.send({ user });

      throw new CustomNotFoundCode('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CustomInvalidDataError('Передача некорректного id'));
      } else {
        next(err);
      }
    });
}

// редактирование данных пользователя
function editProfileUserInfo(req, res, next) {
  const { name, about } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.send({ user });

      throw new CustomNotFoundCode('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new CustomInvalidDataError(
            'Передача некорректных данных при попытке обновления профиля',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Редактирование аватара пользователя
function updateProfileUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.send({ user });

      throw new CustomNotFoundCode('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new CustomInvalidDataError(
            'Передача некорректных данных при попытке обновления аватара',
          ),
        );
      } else {
        next(err);
      }
    });
}

module.exports = {
  registrationUser,
  loginUser,
  getUsersInfo,
  getUserId,
  getUserInfo,
  editProfileUserInfo,
  updateProfileUserAvatar,
};
