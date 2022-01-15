const { merge } = require("lodash");
const { Schema: S } = require("mongoose");

class Schema extends S {
  constructor(definitions, options) {
    super(
      definitions,
      merge(
        {
          timestamps: true,
          toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
              delete ret._id;
              delete ret.__v;
            },
          },
          toObject: {
            virtuals: true,
          },
        },
        options
      )
    );
  }
}

module.exports = Schema;
