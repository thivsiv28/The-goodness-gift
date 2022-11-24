const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        return null;
      }
      return await User.findById(context.user._id).populate("savedFundraisers");
    },
    savedFundraisers: async (parent, args, context) => {
      if (!context.user) {
        return [];
      }

      const user = await User.findById(context.user._id).populate(
        "savedFundraisers"
      );

      return user.savedFundraisers;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addFundraiser: async (parent, { fundraiser }, context) => {
      console.log("Adding new fundraiser", fundraiser, context.user._id);
      try {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedFundraisers: fundraiser } }
        );

        return await User.findById(context.user._id).populate(
          "savedFundraisers"
        );
      } catch (err) {
        console.error("Error creating fundraiser", err);
        return {};
      }
    },
    removedFundraiser: async (parent, { fundraiserId }, context) => {
      console.log("Remove fundraiser", fundraiserId, context.user._id);
      try {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedFundraisers: { fundraiserId: fundraiserId } } }
        );

        return await User.findById(context.user._id).populate(
          "savedFundraisers"
        );
      } catch (err) {
        console.error("Error removing fundraiser", err);
        return {};
      }
    },
  },
};

module.exports = resolvers;
