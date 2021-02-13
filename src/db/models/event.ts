import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface EventModelAttributes {
  createdBy: string;
  description?: string;
  endDate?: string;
  endDateTime?: Date;
  id: number;
  startDate?: string;
  startDateTime?: Date;
  title: string;
}

export class EventModel
  extends Model<EventModelAttributes, Optional<EventModelAttributes, 'id'>>
  implements EventModelAttributes {
  public createdBy!: string;
  public description!: string;
  public endDate!: string;
  public endDateTime!: Date;
  public id!: number;
  public startDate!: string;
  public startDateTime!: Date;
  public title!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initializeTable(sequelize: Sequelize, force: boolean): Promise<EventModel> {
  // Create the "events" table
  EventModel.init(
    {
      createdBy: DataTypes.STRING,
      description: DataTypes.STRING,
      endDate: DataTypes.DATEONLY,
      endDateTime: DataTypes.DATE,
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      startDate: DataTypes.DATEONLY,
      startDateTime: DataTypes.DATE,
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { modelName: 'Event', sequelize },
  );
  return EventModel.sync({ force });
}
