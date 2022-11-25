const { Schema, Types } = require("mongoose");

const contributionSchema = new Schema(
  {
    contributerEmail: {
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
