import dotenv from 'dotenv';
import { Sequelize, DataTypes, Model } from 'sequelize';

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

class EventModel extends Model {}
EventModel.init(
  {
    description: DataTypes.STRING,
    title: DataTypes.STRING,
  },
  { modelName: 'event', sequelize },
);

export async function connect(): Promise<void> {
  return sequelize.authenticate();
}

export function getAll(): Event[] {
  return [];
}

export async function close(): Promise<void> {
  return sequelize.close();
}

// export function save(event: Event) {
//
// }
