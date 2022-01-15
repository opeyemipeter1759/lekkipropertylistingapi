const { withHandler } = require("../error");
const PropertyService = require("../service/property.service");
const ResponseService = require("../service/response.service");
const { HttpStatus } = require("../shared/constants");

const PropertyController = {
  createProperty() {
    return withHandler(async (req, res) => {
      const property = await PropertyService.createProperty(req.body);

      ResponseService.json(
        res,
        HttpStatus.Created,
        "property created",
        property
      );
    });
  },
  getProperties() {
    return withHandler(async (req, res) => {
      const { data, ...meta } = await PropertyService.getProperties(req.query);

      ResponseService.json(res, HttpStatus.Ok, "properties", data, meta);
    });
  },
  getSingleProperty() {
    return withHandler(async (req, res) => {
      const property = await PropertyService.getSingleProperty(
        req.params.propertyId
      );

      ResponseService.json(res, HttpStatus.Ok, "property", property);
    });
  },
  updateProperty() {
    return withHandler(async (req, res) => {
      const property = await PropertyService.updateProperty(
        req.params.propertyId,
        req.body
      );

      ResponseService.json(res, HttpStatus.Ok, "property updated", property);
    });
  },
  deleteProperty() {
    return withHandler(async (req, res) => {
      const property = await PropertyService.deleteProperty(
        req.params.propertyId
      );

      ResponseService.json(res, HttpStatus.Ok, "property deleted", property);
    });
  },
};

module.exports = PropertyController;
