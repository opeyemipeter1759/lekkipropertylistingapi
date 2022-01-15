const ResponseService = {
  json(res, status, message, data, meta) {
    const responseObject = { message };
    if (data) {
      responseObject.data = data;
    }
    if (meta) {
      responseObject.meta = meta;
    }

    res.status(status).json(responseObject);
  },
};

module.exports = ResponseService;
