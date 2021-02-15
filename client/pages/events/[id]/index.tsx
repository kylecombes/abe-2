import * as React from 'react';
import { useRouter } from 'next/router';
import { Event } from '../../../../server/src/types';
import { getEvent } from '../../../api/events';

export default function EditEventPage() {
  const { query } = useRouter();
  const { id } = query;

  const [eventData, setEventData] = React.useState<Event>();

  React.useEffect(() => {
    if (typeof id === 'string') {
      getEvent(id).then((eventData) => {
      setEventData(eventData);
    });
    }
  }, [id]);

  if (!eventData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{eventData.title}</h1>
      <p>{eventData.start} to {eventData.end}</p>
      <p>{eventData.description}</p>
      <div>
        <h2>Tags:</h2>
        <ul>
          {eventData.tags.map((tag) => <li>{tag.name}</li>)}
        </ul>
      </div>
    </div>
  )
}
