const cloudinary = require("cloudinary");
const config = require("../../config");

const { name, key, secret } = config.cloudinary;

cloudinary.v2.config({
  cloud_name: name,
  api_key: key,
  api_secret: secret,
});

const FileService = {
  async uploadFile(fileUploandDTO) {
    try {
      const { data, filename } = fileUploandDTO;
      const [mime] = data.split("data:").pop().split(";");
      const result = await cloudinary.v2.uploader.upload(data);

      return {
        mime,
        filename,
        url: result.url.replace(/^http:\/\//, 'https://'),
        meta: result,
      };
    } catch (error) {
      error.message = `FILE UPLOAD ERROR: ${error.message}`;
      throw error;
    }
  },
};

module.exports = FileService;
