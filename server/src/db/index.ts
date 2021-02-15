import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

import initializeDb from './init';

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
  {
    logging: false,
  },
);

export function init(): Promise<void> {
  return initializeDb(sequelize);
}

export async function connect(): Promise<void> {
  return sequelize.authenticate();
}

export async function close(): Promise<void> {
  return sequelize.close();
}
