import dotenv from 'dotenv';
import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

import { Event } from './types';

// Load environment variables from a .env file, if present
dotenv.config();

const {
  POSTGRES_DB: dbName,
  POSTGRES_PASSWORD: dbPassword,
  POSTGRES_USER: dbUsername,
  POSTGRES_PORT: dbPort = '5432',
  POSTGRES_HOST: dbHost = 'localhost',
} = process.env;

const sequelize = new Sequelize(
  `postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
);

interface EventModelAttributes {
  description?: string;
  id: number;
  title: string;
}

class EventModel
  extends Model<EventModelAttributes, Optional<EventModelAttributes, 'id'>>
  implements EventModelAttributes {
  public id!: number;
  public description!: string;
  public title!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
EventModel.init(
  {
    description: DataTypes.STRING,
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  { modelName: 'Event', sequelize },
);

export async function connect(): Promise<void> {
  return sequelize.authenticate();
}

export async function init() {
  await sequelize.drop();
  await EventModel.sync();
}

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

export async function close(): Promise<void> {
  return sequelize.close();
}

export async function save(data: Event): Promise<EventModel> {
  const event = EventModel.build({
    description: data.description,
    title: data.title,
  });
  return event.save();
}
