import * as React from 'react';
import { Event, ID, Tag } from '../../../types/api';
import { DateTimeInput, FormInput, FormTextarea } from '../../components/forms';
import { makeApiRequest } from '../../util/api';
import { TagList } from '../../components/TagList/TagList';

interface NewEvent extends Pick<Event, 'description' | 'end' | 'location' | 'start' | 'title'> {
  tags: Set<ID>;
}

async function saveNewEvent(data: NewEvent) {
  const event = {
    ...data,
    tags: Array.from(data.tags),
  };
  await makeApiRequest('/events', 'post', event);
}

async function getAllTags(): Promise<Tag[]> {
  return await makeApiRequest('/tags');
}

export default function NewEventPage() {
  const [allTags, setAllTags] = React.useState<Tag[] | undefined>();
  React.useEffect(() => {
    getAllTags().then((tags) => {
      setAllTags(tags);
    });
  }, []);

  const [eventData, setEventData] = React.useState<NewEvent>({
    description: '',
    end: new Date(),
    location: '',
    start: new Date(),
    tags: new Set(),
    title: '',
  });

  const handleTagClick = (tag: Tag) => {
    const tags = new Set(eventData.tags);
    if (tags.has(tag.id)) {
      tags.delete(tag.id);
    } else {
      tags.add(tag.id);
    }
    setEventData({...eventData, tags});
  };

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
      {allTags && (
      <TagList onTagClick={handleTagClick} selectedTags={eventData.tags} tags={allTags} />
      )}
      <button onClick={() => saveNewEvent(eventData)}>Save</button>
    </div>
  );
}
