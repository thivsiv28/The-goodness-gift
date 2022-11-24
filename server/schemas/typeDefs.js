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

 type Query {
    me: User
    savedFundraisers: [SavedFundraiser]
 }  
 
 input Fundraiser {
    posters: [String]
    description: String!
    fundraiserId: String!
    image: String
    link: String
    title: String!

 }

 type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFundraiser(fundraiser: Fundraiser!) User
    removeFundraiser(fundraiserId: String!): User

 }
 `;

module.exports = typeDefs;
