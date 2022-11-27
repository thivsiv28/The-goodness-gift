const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Fundraiser {
    id: String!
    posterUsername: String!
    description: String!
    image: String
    title: String!
    contributions: [Contribution]
    createdAt: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    createdFundraisers: [Fundraiser]
  }

  type Contribution {
    contributorUsername: String!
    contributedAmount: Float
    contributedAt: String
  }
  type Auth {
    token: ID!
    user: User
  }

  input ContributionInput {
    contributerEmail: String!
    contributedAmount: Float
    fundraiserId: String!
  }

  input FundraiserInput {
    posterUsername: String!
    description: String!
    image: String
    title: String!
  }

  input CreditCard {
    name: String!
    number: String!
    expirationMonth: String!
    expirationYear: String!
    cvv: String!
  }

  type Query {
    me: User
    createdFundraisers: [Fundraiser]
    getFundraiserById(fundraiserId: String!): Fundraiser
    getAllFundRaisers: [Fundraiser]
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFundraiser(
      description: String!
      posterUsername: String!
      image: String!
      title: String!
    ): User
    removeFundraiser(fundraiserId: String!): User
    addContribution(
      contributorUsername: String!
      contributedAmount: Float
      fundraiserId: String!
      card: CreditCard!
    ): Fundraiser
  }
`;

module.exports = typeDefs;
