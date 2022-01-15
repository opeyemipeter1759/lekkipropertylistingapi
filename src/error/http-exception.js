class HttpException extends Error {
  constructor(message, status, code, errors) {
    super(message);
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

module.exports = HttpException;
