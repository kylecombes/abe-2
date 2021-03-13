import Head from 'next/head';
import { Calendar} from "../components/calendar";
import {Sidebar} from "../components/sidebar/Sidebar";

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <Sidebar/>
      <main>
       <Calendar />
      </main>
    </div>
  );
}
