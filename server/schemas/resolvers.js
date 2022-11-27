const { User, Fundraiser } = require("../models");
const { signToken } = require("../utils/auth");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const valid = require("card-validator");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        return null;
      }
      const user = await User.findById(context.user._id);
      const fundraisers = await Fundraiser.find({
        posterUsername: user.username,
      });
      user.createdFundraisers = fundraisers;
      return user;
    },
    createdFundraisers: async (parent, args, context) => {
      if (!context.user) {
        return [];
      }

      const user = await User.findById(context.user._id).populate(
        "savedFundraisers"
      );

      return user.savedFundraisers;
    },
    getFundraiserById: async (parent, { fundraiserId }) => {
      return await Fundraiser.findById(fundraiserId).populate("contributions");
    },
    getAllFundRaisers: async (parent) => {
      return await Fundraiser.find({});
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

    addFundraiser: async (
      parent,
      { description, posterUsername, image, title },
      context
    ) => {
      console.log(
        "Adding new fundraiser",
        description,
        posterUsername,
        image,
        title,
        context.user._id
      );
      try {
        await Fundraiser.create({ description, posterUsername, image, title });

        const user = await User.findById(context.user._id);
        const fundraisers = await Fundraiser.find({
          posterUsername: user.username,
        });
        user.createdFundraisers = fundraisers;
        return user;
      } catch (err) {
        console.error("Error creating fundraiser", err);
        return {};
      }
    },
    removeFundraiser: async (parent, { fundraiserId }, context) => {
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
    addContribution: async (
      parent,
      { contributorUsername, contributedAmount, fundraiserId, card }
    ) => {
      if (!valid.number(card.number).isValid) {
        throw new UserInputError("Invalid credit card number");
      }

      if (!valid.expirationMonth(card.expirationMonth).isValid) {
        throw new UserInputError("Invalid expiration month");
      }

      if (!valid.expirationYear(card.expirationYear).isValid) {
        throw new UserInputError("Invalid expiration year");
      }

      if (!valid.cvv(card.cvv).isValid) {
        throw new UserInputError("Invalid cvv");
      }

      if (!valid.cardholderName(card.name).isValid) {
        throw new UserInputError("Invalid name");
      }

      let fundraiser = await Fundraiser.findOneAndUpdate(
        { _id: fundraiserId },
        {
          $addToSet: {
            contributions: {
              contributorUsername,
              contributedAmount,
            },
          },
        }
      );
      console.log("card", card);

      return await Fundraiser.findById(fundraiserId).populate("contributions");
    },
  },
};

module.exports = resolvers;
