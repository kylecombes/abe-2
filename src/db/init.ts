import { Sequelize } from 'sequelize';
import { initializeTable as initializeTagsTable } from './models/tag';
import { initializeTable as initializeEventsTable } from './models/event';
import { initializeTable as initializeUsersTable } from './models/user';

/**
 * Initializes a new database.
 *
 * @param sequelize the database instance to use
 * @param force whether or not to forcibly drop any existing tables.
 * **If `true`, data may be lost.**
 */
export default async function (sequelize: Sequelize, force = false): Promise<void> {
  // Drop any existing data
  await sequelize.drop();

  // Create the new tables
  await initializeTagsTable(sequelize, force);
  await initializeEventsTable(sequelize, force);
  await initializeUsersTable(sequelize, force);
}
