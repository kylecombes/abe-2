import { gql } from '@apollo/client';

export const AddNewEventMutation = gql`
  mutation AddNewEventMutation(
    $title: String!
    $description: String
    $whenWithTimes: DatetimeRangeInput!
  ) {
    createEvent(
      input: { event: { title: $title, description: $description, whenWithTimes: $whenWithTimes } }
    ) {
      event {
        id
      }
    }
  }
`;
