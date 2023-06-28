// сгенерированный секретный ключ
const CONFIDENTIAL_KEY = 'c8c54eb9bb47fdb5a9e8002f9de697fc899ca5777238994607e5544bb43bd8ce';

// шаблон регулярного выражения
const emailPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// статусы ошибок
const SUCCESS_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR = 500;

// экспорт в другие части приложения
module.exports = {
  CONFIDENTIAL_KEY,
  emailPattern,
  SUCCESS_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  INTERNAL_SERVER_ERROR,
};
