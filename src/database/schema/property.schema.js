const mongooseDelete = require("mongoose-delete");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = require("../schema");


const PropertySchema = new Schema({
  propertyAddress: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  numberOfBedrooms: {
    type: Number,
    required: true,
  },
  numberOfSittingRooms: {
    type: Number,
    required: true,
  },
  numberOfKitchens: {
    type: Number,
    required: true,
  },
  numberOfBathrooms: {
    type: Number,
    required: true,
  },
  numberOfToilets: {
    type: Number,
    required: true,
  },
  propertyOwner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validTo: {
    type: Date,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
});

mongoosePaginate(PropertySchema);
mongooseDelete(PropertySchema, {
  overrideMethods: true,
  deletedAt: true,
});

module.exports = PropertySchema;
