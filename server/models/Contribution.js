const { Schema, Types } = require("mongoose");

const dateFormatter = (date) => {
  return date.toDateString();
};

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
      get: dateFormatter,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = contributionSchema;
