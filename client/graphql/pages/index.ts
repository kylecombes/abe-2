import { gql } from '@apollo/client';

export const EventsPageQuery = gql`
  query EventsPageQuery {
    events {
      nodes {
        id
        title
        description
        whenWithTimes {
          start {
            value
          }
          end {
            value
          }
        }
        createdAt
      }
    }
  }
`;
