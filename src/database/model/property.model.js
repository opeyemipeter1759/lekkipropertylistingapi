const { model } = require("mongoose");
const { PROPERTY } = require("../../shared/constants");
const PropertySchema = require("../schema/property.schema");

const Property = model(PROPERTY, PropertySchema);

module.exports = Property;
