import * as React from 'react';
import { useRouter } from 'next/router';
import { makeApiRequest } from '../../../util/api';
import { Event } from '../../../../types/api';
import { TagList } from '../../../components/TagList/TagList';

async function getEvent(eventId: string): Promise<Event> {
  return await makeApiRequest(`/events/${eventId}`);
}

async function deleteEvent(eventId: string): Promise<boolean> {
  const response = await makeApiRequest(`/events/${eventId}`, 'delete');
  return response.status === 200;
}

export default function EditEventPage() {
  const { push, query } = useRouter();
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

  const handleDeleteButtonClick = () => {
    deleteEvent(eventData.id).then(() => push('/'));
  };

  return (
    <div>
      <h1>{eventData.title}</h1>
      <p>{eventData.start} to {eventData.end}</p>
      <p>{eventData.description}</p>
      <div>
        <h2>Tags:</h2>
        <TagList tags={eventData.tags}/>
      </div>
      <button onClick={handleDeleteButtonClick}>Delete</button>
    </div>
  )
}
