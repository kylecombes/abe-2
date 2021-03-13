import * as React from 'react';
import { Event, ID } from '../../../types/api';
import { DateTimeInput, FormInput, FormTextarea } from '../../components/forms';
import { makeApiRequest } from '../../util/api';

interface NewEvent extends Pick<Event, 'description' | 'end' | 'location' | 'start' | 'title'> {
  tags: ID[];
}

async function saveNewEvent(data: NewEvent) {
  await makeApiRequest('/events', 'post', data);
}

export default function NewEventPage() {
  const [eventData, setEventData] = React.useState<NewEvent>({
    description: '',
    end: new Date(),
    location: '',
    start: new Date(),
    tags: [],
    title: '',
  });

  return (
    <div>
      <FormInput
        label="Title"
        onChange={(title) => setEventData({ ...eventData, title })}
        value={eventData.title}
      />
      <FormInput
        label="Location"
        onChange={(location) => setEventData({ ...eventData, location })}
        value={eventData.location}
      />
      <FormTextarea
        label="Description"
        onChange={(description) => setEventData({ ...eventData, description })}
        value={eventData.description}
      />
      {eventData.start instanceof Date && (
        <DateTimeInput
          label="Start"
          onChange={(start) => setEventData({ ...eventData, start })}
          value={eventData.start}
        />
      )}
      {eventData.end instanceof Date && (
        <DateTimeInput
          label="End"
          onChange={(end) => setEventData({ ...eventData, end })}
          value={eventData.end}
        />
      )}
      <button onClick={() => saveNewEvent(eventData)}>Save</button>
    </div>
  );
}
