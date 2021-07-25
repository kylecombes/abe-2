import * as React from 'react';
import { GetServerSidePropsResult } from 'next';
import { Event, ID, Tag } from '../../../types/api';
import { DateTimeInput, FormInput, FormTextarea } from '../../components/forms';
import { TagList } from '../../components/TagList/TagList';
import client from '../../apollo-client';
import { AddNewEventMutation } from '../../graphql/pages/events/new';
import {
  AddNewEventMutation as AddNewEventMutationShape,
  AddNewEventMutationVariables,
} from '../../graphql/pages/events/__generated__/AddNewEventMutation';

async function saveNewEvent(eventData: NewEvent): Promise<void> {
  const { data } = await client.mutate<AddNewEventMutationShape, AddNewEventMutationVariables>({
    mutation: AddNewEventMutation,
    variables: {
      description: eventData.description,
      title: eventData.title,
      whenWithTimes: {
        end: {
          inclusive: false,
          value: eventData.end,
        },
        start: {
          inclusive: false,
          value: eventData.start,
        },
      },
    },
  });

  alert(JSON.stringify(data));
}
interface NewEvent extends Pick<Event, 'description' | 'end' | 'location' | 'start' | 'title'> {
  tags: Set<ID>;
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<NewEventPageProps>> {
  return {
    props: {
      allTags: [],
    },
  };
}

interface NewEventPageProps {
  allTags: Tag[];
}

export default function NewEventPage({ allTags }: NewEventPageProps): React.ReactElement {
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
    setEventData({ ...eventData, tags });
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
