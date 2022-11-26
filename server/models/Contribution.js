const { Schema, Types } = require("mongoose");

const contributionSchema = new Schema(
  {
    contributorUsername: {
      type: String,
      required: true,
    },

    contributedAmount: {
      type: Number,
    },
    contributedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = contributionSchema;
