import * as React from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import client from '../../../apollo-client';
import { GetEventDataQuery } from '../../../graphql/pages/events/edit';
import {
  GetEventDataQuery as GetEventDataQueryType,
  GetEventDataQuery_event as Event,
} from '../../../graphql/pages/events/__generated__/GetEventDataQuery';
import { useQuery } from '@apollo/client';

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<EditEventPageProps>> {
  const { id } = context.query;

  let event;
  if (typeof id === 'string') {
    const response = await client.query<GetEventDataQueryType>({
      query: GetEventDataQuery,
      variables: {
        id: Number.parseInt(id),
      },
    });
    event = response.data.event;
  }
  return {
    props: {
      event,
    },
  };
}

interface EditEventPageProps {
  event: Event | null;
}

export default function EditEventPage({ event }: EditEventPageProps) {
  const { query } = useRouter();
  const { id } = query;
  const queryClientSideResult = useQuery<GetEventDataQueryType>(GetEventDataQuery, {
    skip: Boolean(event),
    variables: {
      id,
    },
  });

  const eventData = event || queryClientSideResult.data.event;

  if (!eventData) {
    return <h1>Loading...</h1>;
  }

  const handleDeleteButtonClick = () => {
    alert('Boo!');
  };

  return (
    <div>
      <h1>{eventData.title}</h1>
      <p>{eventData.description}</p>
      <button onClick={handleDeleteButtonClick}>Delete</button>
    </div>
  );
}
