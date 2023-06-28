const jwt = require('jsonwebtoken');

const { CONFIDENTIAL_KEY } = require('../utils/constants');

const CustomAuthenticationError = require('../errors/CustomAuthenticationError');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  const errorMessage = 'Неправильные почта или пароль';
  // Проверка наличие и формат заголовка авторизации
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(
      new CustomAuthenticationError(`${errorMessage}(${authorization})!`),
    );
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    // Верифицикация токена с использованием секретного ключа
    payload = jwt.verify(token, CONFIDENTIAL_KEY);
  } catch (err) {
    return next(new CustomAuthenticationError(`${errorMessage}!`));
  }

  // Данные пользователя сохраняем в объекте запроса
  req.user = payload;

  return next();
};
