const PropertyRepository = require("../database/repository/property.repository");
const NotFoundException = require("../error/not-found-exception");
const FileService = require("./file.service");

const PropertyService = {
  async uploadPropertyImages(filesToUpload) {
    return Promise.all(
      filesToUpload.map(async (fileToUpload) => {
        if (typeof fileToUpload === "string") {
          return fileToUpload;
        }

        const file = await FileService.uploadFile(fileToUpload);

        return file.url;
      })
    );
  },
  async createProperty(payload) {
    const { images: filesToUpload, ...remainingPayload } = payload;
    const images = await this.uploadPropertyImages(filesToUpload);

    return PropertyRepository.createProperty({ images, ...remainingPayload });
  },
  async getProperties(pagination) {
    return PropertyRepository.getPropertiesPaginated(pagination);
  },
  async findPropertyByIdOrFail(id) {
    const property = await PropertyRepository.getSingleProperty(id);
    if (!property) {
      throw new NotFoundException("property not found", "PropertyNotFound");
    }

    return property;
  },
  async getSingleProperty(id) {
    return this.findPropertyByIdOrFail(id);
  },
  async updateProperty(id, update) {
    const { images: filesToUpload, ...remainingUpdate } = update;
    if (filesToUpload) {
      remainingUpdate.images = await this.uploadPropertyImages(filesToUpload);
    }

    return PropertyRepository.updateSingleProperty(id, remainingUpdate);
  },
  async deleteProperty(id) {
    const property = await this.findPropertyByIdOrFail(id);

    return PropertyRepository.deletePropertyDocument(property);
  }
};

module.exports = PropertyService;
