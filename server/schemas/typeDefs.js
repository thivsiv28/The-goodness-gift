const { gql } = require("apollo-server-express");

const typeDefs = gql`
type SavedFundraiser {
    poster: [String]
    description: String!
    fundraiserId: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    savedFundraisers: [SavedFundraiser]

    

module.exports = typeDefs;
