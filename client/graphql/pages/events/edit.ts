import { gql } from '@apollo/client';

export const GetEventDataQuery = gql`
  query GetEventDataQuery($id: Int!) {
    event(id: $id) {
      id
      title
      description
    }
  }
`;
