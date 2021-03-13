import { Op } from 'sequelize';

import { EventModel } from './db/models/event';
import { InvalidIdError, NotFoundError } from './errors';
import { ID, Event, EventWithoutId, Tag } from '../../types/api';
import validator from 'validator';
import { User } from './types';

export async function getAll(): Promise<Event[]> {
  const events = await EventModel.findAll();
  return Promise.all(
    events.map(async (dbObj) => ({
      createdBy: dbObj.createdBy,
      description: dbObj.description,
      end: dbObj.endDateTime ? dbObj.endDateTime : dbObj.endDate,
      id: dbObj.id,
      start: dbObj.startDateTime ? dbObj.startDateTime : dbObj.startDate,
      tags: (await dbObj.getTags()) as Tag[],
      title: dbObj.title,
    })),
  );
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
    start: record.startDate ? record.startDate : record.startDateTime,
    tags: await record.getTags(),
    title: record.title,
  };
}

export async function save(
  data: Omit<Event, 'tags'> & { tags: string[] },
  user: User,
): Promise<Event> {
  // TODO: Ensure all required fields are present and of the correct type
  const event = EventModel.build({
    createdBy: user.id,
    description: data.description,
    endDate: typeof data.end === 'string' ? data.end : undefined,
    endDateTime: typeof data.end === 'string' ? undefined : data.end,
    startDate: typeof data.start === 'string' ? data.start : undefined,
    startDateTime: typeof data.start === 'string' ? undefined : data.start,
    title: data.title,
  });
  event.setTags(data.tags);
  const savedRecord = await event.save();
  return eventModelToEvent(savedRecord);
}

export async function patch(eventId: ID, data: EventWithoutId): Promise<Event> {
  if (!validator.isUUID(eventId)) {
    throw new InvalidIdError('The event ID specified is not a valid UUID.');
  }
  const event = await EventModel.findOne({
    where: {
      id: {
        [Op.eq]: eventId,
      },
    },
  });
  if (!event) {
    throw new NotFoundError(`Unable to find an event with the ID "${eventId}".`);
  }
  const updateObj: Partial<EventModel> = {
    ...data,
    endDate: typeof data.end === 'string' ? data.end : undefined,
    startDate: typeof data.start === 'string' ? data.start : undefined,
  };

  await event.update(updateObj);
  const savedRecord = await event.save();
  // TODO: Journal event edit with user ID
  return eventModelToEvent(savedRecord);
}

function eventModelToEvent(model: EventModel): Event {
  return {
    createdBy: model.createdBy,
    description: model.description,
    end: model.endDateTime || model.endDate,
    id: model.id,
    // TODO: Populate this
    start: model.startDateTime || model.startDate,
    tags: [],
    title: model.title,
  };
}
