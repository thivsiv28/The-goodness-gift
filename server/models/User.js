const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Import schema from Fundraiser.js
const fundraiserSchema = require("./Fundraiser");
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Must use a valid email address"],
        },
        password: {
            type: String,
            required: true,
        },
// Set favouriteFundraisers to be an array of data that adheres to the fundraiserSchema
        favouriteFundraisers: [fundraiserSchema],
    },
// Set this to use virtual below
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// Hash user password
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  // Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
// When we query a user, we'll also get another field called `fundraiserCount` with the number of favourite fundraisers we have
userSchema.virtual("fundraiserCount").get(function () {
    return this.favouriteFundraisers.length;
  });
  
  const User = model("User", userSchema);
  
  module.exports = User;
    