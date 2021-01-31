import { Op } from 'sequelize';
import { findUserByConnectedAccountId, UserModel } from './db/models/user';
import { ID, NewOrExistingUser, User } from './types';
import validator from 'validator';
import { InvalidIdError, NotFoundError } from './errors';

interface ConnectedAccount {
  accountId: string;
  provider: string;
}

export async function deleteOne(userId: string): Promise<boolean> {
  // TODO: More discrimination between 1 and other counts?
  return (
    (await UserModel.destroy({
      where: {
        id: {
          [Op.eq]: userId,
        },
      },
    })) === 1
  );
}

export async function getAll(): Promise<User[]> {
  const users = await UserModel.findAll();
  return users.map(userModelToUser);
}

export async function getOrCreateUserByConnectedAccountId(
  userInfo: NewOrExistingUser,
  connectedAccount: ConnectedAccount,
): Promise<User> {
  const existingUser = await findUserByConnectedAccountId(
    connectedAccount.provider,
    connectedAccount.accountId,
  );
  if (existingUser) {
    return existingUser;
  }
  const user = await UserModel.build({
    avatar: userInfo.avatar,
    connectedAccountId: connectedAccount.accountId,
    displayName: userInfo.name.display || '',
    firstName: userInfo.name.first || '',
    isSuperAdmin: userInfo.isSuperAdmin,
    lastName: userInfo.name.last || '',
  }).save();
  return {
    ...userInfo,
    id: user.id,
  };
}

export async function getOne(userId: string): Promise<User | null> {
  const record = await UserModel.findOne({
    where: {
      id: {
        [Op.eq]: userId,
      },
    },
  });
  if (!record) return null;
  return userModelToUser(record);
}

export async function patch(userId: ID, data: Partial<User>): Promise<User> {
  if (!validator.isUUID(userId)) {
    throw new InvalidIdError('The user ID specified is not a valid UUID.');
  }
  const user = await UserModel.findOne({
    where: {
      id: {
        [Op.eq]: userId,
      },
    },
  });
  if (!user) {
    throw new NotFoundError(`Unable to find an user with the ID "${userId}".`);
  }
  const updateObj: Partial<UserModel> = {
    ...data,
    displayName: data.name?.display,
    firstName: data.name?.first,
    id: undefined,
    lastName: data.name?.last,
  };

  await user.update(updateObj);
  const savedRecord = await user.save();
  // TODO: Journal user edit with user ID
  return userModelToUser(savedRecord);
}

function userModelToUser(user: UserModel): User {
  return {
    id: user.id,
    isSuperAdmin: user.isSuperAdmin,
    name: {
      display: user.displayName,
      first: user.firstName,
      last: user.lastName,
    },
  };
}
