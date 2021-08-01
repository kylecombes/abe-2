import * as React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/client';
import { getPostGraphileJWT, GetPostGraphileJWTMutation } from '../api-utils/api-utils';
import { useMutation } from '@apollo/client';
import {
  GetPostGraphileJWT,
  GetPostGraphileJWTVariables,
} from '../api-utils/__generated__/GetPostGraphileJWT';

function getJwt() {
  return new Promise<string>((resolve, reject) => {
    axios
      .get('http://localhost:3000/api/auth/jwt')
      .then((response) => {
        const data = response.data;
        resolve(data.pgJwt);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function useJWT() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<unknown | null>(null);
  const [jwt, setJwt] = React.useState<string | null>(null);

  React.useEffect(() => {
    getJwt()
      .then((jwt) => {
        setJwt(jwt);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }, []);

  return {
    error,
    jwt,
    loading,
  };
}

interface ProfilePageProps {
  jwt: string;
  session: Session;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<ProfilePageProps>> {
  const session = await getSession(context);
  const jwt = await getPostGraphileJWT(session.user.email);
  return {
    props: {
      jwt,
      session,
    },
  };
}

export default function ProfilePage({
  jwt: jwtFromProps,
  session: sessionFromProps,
}: ProfilePageProps): React.ReactElement {
  const [sessionFromHook, loading] = useSession();
  const session = sessionFromProps ?? sessionFromHook;

  const { loading: jwtLoading, jwt: jwtFromHook } = useJWT();
  const jwt = jwtFromProps || jwtFromHook;

  const [mutate, { data: pgJwt, loading: pgJwtLoading }] = useMutation<
    GetPostGraphileJWT,
    GetPostGraphileJWTVariables
  >(GetPostGraphileJWTMutation, {
    variables: {
      email: 'kylecombes@gmail.com',
    },
  });

  React.useEffect(() => {
    mutate();
  }, []);

  if (!session && (loading || jwtLoading || pgJwtLoading)) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <p>Hello, {session.user.name}!</p>
      <p>Your PostGraphile JWT is {jwt}</p>
      <p>Can confirm, is {JSON.stringify(pgJwt)}</p>
      <p>Dope!!!!!</p>
    </>
  );
}
