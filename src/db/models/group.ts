import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Group } from '../../types';

interface GroupModelAttributes extends Omit<Group, 'id' | 'labels'> {
  id: string;
  labels?: string;
}

export class GroupModel
  extends Model<GroupModelAttributes, Optional<GroupModelAttributes, 'id'>>
  implements GroupModelAttributes {
  public description?: string;
  public id!: string;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initializeTable(sequelize: Sequelize, force: boolean): Promise<GroupModel> {
  GroupModel.init(
    {
      description: DataTypes.STRING,
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      labels: DataTypes.STRING,
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { modelName: 'Group', sequelize },
  );
  return GroupModel.sync({ force });
}
