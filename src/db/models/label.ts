import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface LabelModelAttributes {
  /** A long description of the label */
  description?: string;
  /** A UUID */
  id: string;
  /** The (short) name of the label */
  name: string;
  /** The ID of the parent label (if any) */
  parent?: string;
}

export class LabelModel
  extends Model<LabelModelAttributes, Optional<LabelModelAttributes, 'id'>>
  implements LabelModelAttributes {
  public description!: string;
  public id!: string;
  public name!: string;
  public parent!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initializeTable(sequelize: Sequelize, force: boolean): Promise<LabelModel> {
  // Create the "labels" table
  LabelModel.init(
    {
      description: DataTypes.STRING,
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING,
      parent: DataTypes.UUID,
    },
    { modelName: 'Label', sequelize },
  );
  return LabelModel.sync({ force });
}
