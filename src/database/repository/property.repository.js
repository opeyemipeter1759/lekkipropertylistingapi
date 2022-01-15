const { merge } = require("lodash");
const { isValidObjectId } = require("mongoose");
const utils = require("../../shared/utils");
const Property = require("../model/property.model");

const PropertyRepository = {
  async createProperty(payload) {
    return Property.create(payload);
  },
  async getPropertiesPaginated(pagination) {
    const query = { deleted: { $ne: true } };
    const { all, page, limit, validFrom, validTo, ...otherFilters } = pagination;
    if (validFrom) {
      query.validFrom = { $gte: validFrom };
    }
    if (validTo) {
      query.validTo = { $lte: validTo };
    }
    Object.keys(otherFilters).forEach(key => {
      const value = otherFilters[key];
      if (+value) {
        query[key] = +value;
        return;
      }

      query[key] = { $regex: value, $options: 'gi' };
    });


    return Property.paginate(
      query,
      utils.getPaginateOptions({ page, all, limit }, { createdAt: -1 })
    );
  },
  async getSingleProperty(propertyId) {
    if (!isValidObjectId(propertyId)) {
      return null;
    }

    return Property.findOne({ _id: propertyId });
  },
  async updateSingleProperty(propertyId, update) {
    await Property.updateOne({ _id: propertyId }, { $set: update });

    return this.getSingleProperty(propertyId);
  },
  async deletePropertyDocument(property) {
    merge(property, { deleted: true });

    return property.save();
  }
};

module.exports = PropertyRepository;
