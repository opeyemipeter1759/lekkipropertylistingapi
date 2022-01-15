const { HttpStatus } = require("../shared/constants");
const HttpException = require("./http-exception");

class ValidationException extends HttpException {
  constructor(errors = null, message = 'validation error', code = 'UnprocessableEntity') {
    super(message, HttpStatus.UnprocessableEntity, code, errors);
  }
}

module.exports = ValidationException;