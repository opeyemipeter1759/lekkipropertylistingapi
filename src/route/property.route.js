const { Router } = require("express");
const PropertyController = require("../controller/property.controller");
const { validate } = require("../validation");
const {
  CreatePropertyValidation,
  PaginatePropertyValidation,
  UpdatePropertyValidation,
} = require("../validation/schemas");

const router = new Router();

router.post(
  "/",
  validate({ body: CreatePropertyValidation }),
  PropertyController.createProperty()
);
router.get(
  "/",
  validate({ query: PaginatePropertyValidation }),
  PropertyController.getProperties()
);
router.get("/:propertyId", PropertyController.getSingleProperty());
router.put("/:propertyId", validate({ body: UpdatePropertyValidation }), PropertyController.updateProperty());
router.delete("/:propertyId", PropertyController.deleteProperty());

module.exports = router;
