const dotenv = require("dotenv");
const Path = require("path");

dotenv.config({ path: Path.resolve(__dirname, "../.env") });

module.exports = {
  port: +process.env.PORT || 2001,
  dbURL: process.env.DB_URL,
  isDev:
    !process.env.NODE_ENV ||
    ["development", "test", "localhost", "local"].includes(
      process.env.NODE_ENV
    ),
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    key: process.env.CLOUDINARY_KEY,
    secret: process.env.CLOUDINARY_SECRET,
  },
};
