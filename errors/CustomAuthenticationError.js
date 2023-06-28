module.exports = class CustomAuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
