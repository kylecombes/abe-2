import { EventModel } from './db/models/event';

import { Event, User } from './types';

export async function getAll(): Promise<Event[]> {
  const events = await EventModel.findAll();
  return events.map((dbObj) => ({
    createdBy: 'hi',
    description: dbObj.description,
    end: new Date(),
    labels: [],
    start: new Date(),
    title: dbObj.title,
  }));
}

export async function save(data: Event, user: User): Promise<EventModel> {
  const event = EventModel.build({
    createdBy: user.id,
    description: data.description,
    endDate: typeof data.end === 'string' ? data.end : undefined,
    endDateTime: typeof data.end === 'string' ? undefined : data.end,
    startDate: typeof data.start === 'string' ? data.start : undefined,
    startDateTime: typeof data.start === 'string' ? undefined : data.start,
    title: data.title,
  });
  return event.save();
}
