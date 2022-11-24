const { Schema } = require("mongoose");

const fundraiserSchema = new Schema({
  poster: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved fundrasier id from from site
  fundraiserId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = fundraiserSchema;
