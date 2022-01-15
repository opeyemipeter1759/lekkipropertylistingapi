const { HttpStatus } = require("../shared/constants");
const HttpException = require("./http-exception");

module.exports = {
  allExceptionCatcher() {
    return (error, req, res, next) => {
      const isHttpError = error instanceof HttpException;
      const message = isHttpError
        ? error.message
        : "Something unexpected happened";
      const status = isHttpError ? error.status : HttpStatus.ServerError;
      const code = isHttpError ? error.code : "ServerError";
      const resObject = {
        message,
        code,
        timestamp: new Date().toISOString(),
        path: req.url,
      };
      if (isHttpError && error.errors) {
        resObject.errors = error.errors;
      }

      if (!isHttpError) {
        console.log(error.message, error.stack);
      }

      res.status(status).json(resObject);
    };
  },
  withHandler(func) {
    return async (req, res, next) => {
      try {
        await func(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  },
};
