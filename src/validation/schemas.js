const Joi = require("joi");

exports.FileUploadValidation = Joi.object({
  filename: Joi.string().required(),
  data: Joi.string().dataUri().required(),
}).required();

exports.CreatePropertyValidation = Joi.object({
  propertyAddress: Joi.string().required(),
  propertyType: Joi.string().required(),
  numberOfBedrooms: Joi.number().required(),
  numberOfSittingRooms: Joi.number().required(),
  numberOfKitchens: Joi.number().required(),
  numberOfBathrooms: Joi.number().required(),
  numberOfToilets: Joi.number().required(),
  propertyOwner: Joi.string().required(),
  description: Joi.string().required(),
  validFrom: Joi.date().required(),
  validTo: Joi.date().required(),
  images: Joi.array()
    .items(
      Joi.alternatives()
        .try(exports.FileUploadValidation, Joi.string().uri().required())
        .required()
    )
    .min(1)
    .required(),
}).required();

exports.UpdatePropertyValidation = Joi.object({
  numberOfBedrooms: Joi.number().optional(),
  numberOfSittingRooms: Joi.number().optional(),
  numberOfKitchens: Joi.number().optional(),
  numberOfBathrooms: Joi.number().optional(),
  numberOfToilets: Joi.number().optional(),
  description: Joi.string().optional(),
  validTo: Joi.date().optional(),
  images: Joi.array()
    .items(
      Joi.alternatives()
        .try(exports.FileUploadValidation, Joi.string().uri().required())
        .required()
    )
    .min(1)
    .optional(),
}).required();

exports.PaginatePropertyValidation = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  all: Joi.string().optional(),
  propertyAddress: Joi.string().optional(),
  propertyType: Joi.string().optional(),
  numberOfBedrooms: Joi.number().optional(),
  numberOfSittingRooms: Joi.number().optional(),
  numberOfKitchens: Joi.number().optional(),
  numberOfBathrooms: Joi.number().optional(),
  numberOfToilets: Joi.number().optional(),
  propertyOwner: Joi.string().optional(),
  description: Joi.string().optional(),
  validFrom: Joi.date().optional(),
  validTo: Joi.date().optional(),
}).required();
