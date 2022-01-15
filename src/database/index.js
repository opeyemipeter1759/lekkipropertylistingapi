const mongoose = require("mongoose");
const config = require("../../config");

module.exports = {
  init: () => {
    mongoose
      .connect(config.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => {
        console.log(`error connecting to database - ${error.message}`);
      });
  },
};
