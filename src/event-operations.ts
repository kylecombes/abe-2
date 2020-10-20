import { Op } from 'sequelize';

import { EventModel } from './db/models/event';
import { Event, User } from './types';

export async function getAll(): Promise<Event[]> {
  const events = await EventModel.findAll();
  return events.map((dbObj) => ({
    createdBy: dbObj.createdBy,
    description: dbObj.description,
    end: dbObj.endDateTime ? dbObj.endDateTime : dbObj.endDate,
    id: dbObj.id,
    labels: [],
    start: dbObj.startDateTime ? dbObj.startDateTime : dbObj.startDate,
    title: dbObj.title,
  }));
}

export async function deleteOne(eventId: string): Promise<boolean> {
  // TODO: More discrimination between 1 and other counts?
  return (
    (await EventModel.destroy({
      where: {
        id: {
          [Op.eq]: eventId,
        },
      },
    })) === 1
  );
}

export async function getOne(eventId: string): Promise<Event | null> {
  const record = await EventModel.findOne({
    where: {
      id: {
        [Op.eq]: eventId,
      },
    },
  });
  if (!record) return null;
  return {
    createdBy: record.createdBy,
    description: record.description,
    end: record.endDate ? record.endDate : record.endDateTime,
    id: record.id,
    labels: [],
    start: record.startDate ? record.startDate : record.startDateTime,
    title: record.title,
  };
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
