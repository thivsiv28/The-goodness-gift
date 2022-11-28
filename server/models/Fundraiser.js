const { Schema, model } = require("mongoose");
const contributionSchema = require("./Contribution");

const dateFormatter = (date) => {
  return date.toDateString();
};

const fundraiserSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },

    posterUsername: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: dateFormatter,
    },
    title: {
      type: String,
      required: true,
    },
    contributions: [contributionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Fundraiser = model("fundraiser", fundraiserSchema);

module.exports = Fundraiser;
