import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface TagModelAttributes {
  /** A long description of the tag */
  description?: string;
  /** A UUID */
  id: string;
  /** The (short) name of the tag */
  name: string;
  /** The ID of the parent tag (if any) */
  parent?: string;
}

export class TagModel
  extends Model<TagModelAttributes, Optional<TagModelAttributes, 'id'>>
  implements TagModelAttributes {
  public description!: string;
  public id!: string;
  public name!: string;
  public parent!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initializeTable(sequelize: Sequelize, force: boolean): Promise<TagModel> {
  // Create the "tags" table
  TagModel.init(
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
    { modelName: 'Tag', sequelize },
  );
  return TagModel.sync({ force });
}
