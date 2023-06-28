module.exports = class CustomInvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
