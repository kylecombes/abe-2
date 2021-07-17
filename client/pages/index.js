import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import { Calendar} from "../components/calendar";
import {Sidebar} from "../components/sidebar/Sidebar";

import styles from '../styles/Home.module.css';

const Query = gql`
  query Events {
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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: Query,
  });

  return {
    props: {
      events: data.events.nodes,
    }
  }
}

export default function Home({ events }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <Sidebar/>
     <Calendar events={events}/>
    </div>
  );
}
