import { Sequelize } from 'sequelize';
import { EventModel } from './models/event';
import { TagModel } from './models/tag';

export default async function (sequelize: Sequelize): Promise<void> {
  EventModel.belongsToMany(TagModel, { through: 'EventTags' });
  TagModel.belongsToMany(EventModel, { through: 'EventTags' });

  await sequelize.sync();
}
