import * as React from 'react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import enUs from 'date-fns/locale/en-US';
import getDay from 'date-fns/getDay';
import {
  Calendar as ReactBigCalendar,
  dateFnsLocalizer,
  Event as RBCEvent,
} from 'react-big-calendar';
import { useRouter } from 'next/router';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// TODO: Get this from a global types file
import { EventsPageQuery_events_nodes as Event } from '../../graphql/pages/__generated__/EventsPageQuery';
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

interface Props {
  events: Event[];
}

type RBCEventWithId = RBCEvent & { id: number };

function convertEventFormat(event: Event): RBCEventWithId {
  return {
    end: new Date(event.whenWithTimes.end.value),
    id: event.id,
    start: new Date(event.whenWithTimes.start.value),
    title: event.title,
  };
}

export const Calendar = ({ events }: Props): React.ReactElement => {
  const router = useRouter();

  if (events === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.Calendar}>
      <ReactBigCalendar
        className={styles.ReactBigCalendar}
        events={events.map(convertEventFormat)}
        onDoubleClickEvent={(event) => router.push(`/events/${event.id}`)}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};
