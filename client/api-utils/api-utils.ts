import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import {
  GetPostGraphileJWT,
  GetPostGraphileJWTVariables,
} from './__generated__/GetPostGraphileJWT';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:5000/graphql',
});

export const GetPostGraphileJWTMutation = gql`
  mutation GetPostGraphileJWT($email: String!) {
    authenticate(input: { email: $email }) {
      jwt
    }
  }
`;

export async function getPostGraphileJWT(email: string): Promise<string> {
  const { data } = await client.mutate<GetPostGraphileJWT, GetPostGraphileJWTVariables>({
    mutation: GetPostGraphileJWTMutation,
    variables: {
      email,
    },
  });

  return data.authenticate.jwt;
}
