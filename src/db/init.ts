import { Sequelize } from 'sequelize';
import { initializeTable as initializeEventsTable } from './models/event';
import { initializeTable as initializeUsersTable } from './models/user';

/**
 * Initializes a new database.
 *
 * **WARNING: ALL EXISTING DATA WILL BE LOST**
 */
export default async function (sequelize: Sequelize, force = false): Promise<void> {
  // Drop any existing data
  await sequelize.drop();

  // Create the new tables
  await initializeEventsTable(sequelize, force);
  await initializeUsersTable(sequelize, force);
}
