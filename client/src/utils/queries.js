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
        id
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

export const GET_ALL_FUNDRAISERS = gql`
  query GetAllFundRaisers {
    getAllFundRaisers {
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

export const GET_FUNDRAISER_BY_ID = gql`
  query GetFundraiserById($fundraiserId: String!) {
    getFundraiserById(fundraiserId: $fundraiserId) {
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
