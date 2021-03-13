import * as React from 'react';
import axios from 'axios';
import { Event } from '../../../types/api';

const getEvents = async () => {
  const response = await axios.get('/api/events');
  return response.data;
};

export const Calendar = () => {
  const [events, setEvents] = React.useState<Event[] | null>(null);
  React.useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  if (events === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <ul>
      {events.map((event) => (
        <li>{event.title}</li>
      ))}
    </ul>
  );
};
