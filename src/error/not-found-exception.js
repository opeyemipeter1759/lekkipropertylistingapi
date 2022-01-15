const { HttpStatus } = require("../shared/constants");
const HttpException = require("./http-exception");

class NotFoundException extends HttpException {
  constructor(message = 'not found', code = 'NotFound') {
    super(message, HttpStatus.NotFound, code);
  }
}

module.exports = NotFoundException;