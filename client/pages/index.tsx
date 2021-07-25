import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import client from '../apollo-client';
import { Calendar } from '../components/calendar';
import { Sidebar } from '../components/sidebar/Sidebar';
import { EventsPageQuery } from '../graphql/pages';

import styles from '../styles/Home.module.css';
import {
  EventsPageQuery as PageQueryShape,
  EventsPageQuery_events_nodes as Event,
} from '../graphql/pages/__generated__/EventsPageQuery';

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
  const { data } = await client.query<PageQueryShape>({
    query: EventsPageQuery,
  });

  return {
    props: {
      events: data.events.nodes,
    },
  };
}

interface Props {
  events: Event[];
}

export default function Home({ events }: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <Sidebar />
      <Calendar events={events} />
    </div>
  );
}
