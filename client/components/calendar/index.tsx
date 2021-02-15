import * as React from 'react';
import { Event } from '../../../server/src/types';
import { getAllEvents } from '../../api/events';


export const Calendar = () => {
  const [events, setEvents] = React.useState<Event[] | null>(null);
  React.useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  if (events === null) {
    return <h1>Loading...</h1>
  }

  return (
    <ul>
      {events.map((event) => (
        <li>{event.title}</li>
      ))}
    </ul>
  )
}
