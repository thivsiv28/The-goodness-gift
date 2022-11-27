import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        createdFundraisers {
          posterUsername
          description
          image
          title
          contributions {
            contributorUsername
            contributedAmount
            contributedAt
          }
          createdAt
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        createdFundraisers {
          posterUsername
          description
          image
          title
          contributions {
            contributorUsername
            contributedAmount
            contributedAt
          }
          createdAt
        }
      }
    }
  }
`;

export const ADD_FUNDRAISER = gql`
  mutation AddFundraiser(
    $description: String!
    $image: String!
    $title: String!
    $posterUsername: String!
  ) {
    addFundraiser(
      description: $description
      image: $image
      title: $title
      posterUsername: $posterUsername
    ) {
      _id
      username
      email
      password
      createdFundraisers {
        id
        posterUsername
        description
        image
        title
        contributions {
          contributorUsername
          contributedAmount
          contributedAt
        }
        createdAt
      }
    }
  }
`;

export const ADD_CONTRIBUTION = gql`
  mutation AddContribution(
    $contributorUsername: String!
    $fundraiserId: String!
    $card: CreditCard!
    $contributedAmount: Float
  ) {
    addContribution(
      contributorUsername: $contributorUsername
      fundraiserId: $fundraiserId
      card: $card
      contributedAmount: $contributedAmount
    ) {
      id
      posterUsername
      description
      image
      title
      contributions {
        contributorUsername
        contributedAmount
        contributedAt
      }
      createdAt
    }
  }
`;
