import { findUserByConnectedAccountId, UserModel } from '../db/models/user';
import { NewOrExistingUser, User } from '../types';

interface ConnectedAccount {
  accountId: string;
  provider: string;
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
    lastName: userInfo.name.last || '',
  }).save();
  return {
    ...userInfo,
    id: user.id,
  };
}
