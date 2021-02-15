import Head from 'next/head';
import { Calendar} from "../components/calendar";

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
       <Calendar />
      </main>
    </div>
  );
}
