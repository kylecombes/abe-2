import * as React from 'react';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import enUs from 'date-fns/locale/en-US';
import getDay from 'date-fns/getDay'
import { Calendar as ReactBigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { useRouter } from 'next/router';
import { Event } from '../../../types/api';
import { makeApiRequest } from '../../util/api';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Calendar.module.css';

const localizer = dateFnsLocalizer({
  format,
  getDay,
  locales: {
    'en-US': enUs,
  },
  parse,
  startOfWeek,
});

const getEvents = async () => {
  return await makeApiRequest('/events');
};

export const Calendar = () => {
  const router = useRouter();
  const [events, setEvents] = React.useState<Event[] | null>(null);
  React.useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  if (events === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.Calendar}>
      <ReactBigCalendar
        className={styles.ReactBigCalendar}
        events={events}
        onDoubleClickEvent={(event => router.push(`/events/${event.id}`))}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};
