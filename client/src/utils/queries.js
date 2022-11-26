import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
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
          contributerEmail
          contributedAmount
          contributedAt
        }
        createdAt
      }
    }
  }
`;

export const GET_ALL_FUNDRAISERS = gql`
  query GetAllFundRaisers {
    getAllFundRaisers {
      id
      posterUsername
      description
      image
      title
      contributions {
        contributerEmail
        contributedAmount
        contributedAt
      }
      createdAt
    }
  }
`;
