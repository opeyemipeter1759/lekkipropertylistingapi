const ValidationException = require("../error/validation-exception");
const utils = require("../shared/utils");

module.exports = {
  validate(schemas) {
    return async (req, _res, next) => {
      const validations = Object.keys(schemas).map(async (key) => {
        try {
          const payload = req[key];
          const schema = schemas[key];

          await schema.validateAsync(payload, { abortEarly: false });
        } catch (error) {
          next(new ValidationException(utils.formatJoiError(error.details)));
        }
      });

      await Promise.all(validations);

      next();
    };
  },
};
