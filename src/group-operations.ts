import { Op } from 'sequelize';

import { GroupModel } from './db/models/group';
import { Group } from './types';
import { LIST_DELIMITER } from './utils';

export async function getAll(): Promise<Group[]> {
  return await GroupModel.findAll();
}

export async function deleteOne(groupId: string): Promise<boolean> {
  // TODO: More discrimination between 1 and other counts?
  return (
    (await GroupModel.destroy({
      where: {
        id: {
          [Op.eq]: groupId,
        },
      },
    })) === 1
  );
}

export async function getOne(groupId: string): Promise<Group | null> {
  const record = await GroupModel.findOne({
    where: {
      id: {
        [Op.eq]: groupId,
      },
    },
  });
  if (!record) return null;
  return { ...record };
}

export async function save(data: Group): Promise<Group> {
  const group = GroupModel.build({
    description: data.description,
    labels: data.labels?.map((label) => label.id).join(LIST_DELIMITER),
    name: data.name,
  });
  return group.save();
}
