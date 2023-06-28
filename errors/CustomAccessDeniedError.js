module.exports = class CustomAccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
