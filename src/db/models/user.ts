import { DataTypes, Model, Op, Optional, Sequelize } from 'sequelize';
import { User } from '../../types';

interface UserModelAttributes {
  avatar?: string;
  connectedAccountId: string;
  displayName?: string;
  firstName?: string;
  id: number;
  lastName?: string;
}

export class UserModel
  extends Model<UserModelAttributes, Optional<UserModelAttributes, 'id'>>
  implements UserModelAttributes {
  public avatar?: string;
  public connectedAccountId!: string;
  public displayName?: string;
  public firstName?: string;
  public id!: number;
  public lastName?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initializeTable(sequelize: Sequelize, force: boolean): Promise<UserModel> {
  // Create the "users" table
  UserModel.init(
    {
      avatar: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      // TODO: Make this its own table
      connectedAccountId: DataTypes.STRING,
      displayName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { modelName: 'User', sequelize },
  );
  return UserModel.sync({ force });
}

export async function findUserByConnectedAccountId(
  providerName: string,
  accountId: string,
): Promise<User | null> {
  const dbObjs = await UserModel.findAll({
    where: {
      connectedAccountId: {
        [Op.eq]: accountId,
      },
    },
  });
  if (dbObjs.length === 0) return null;
  const dbObj = dbObjs[0];
  return {
    avatar: dbObj.avatar,
    id: dbObj.id,
    name: {
      display: dbObj.displayName,
      first: dbObj.firstName,
      last: dbObj.lastName,
    },
  };
}
