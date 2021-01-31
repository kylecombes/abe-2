import { Op } from 'sequelize';

import { TagModel } from './db/models/tag';
import { Tag } from './types';

export async function getAll(): Promise<Tag[]> {
  return await TagModel.findAll();
}

export async function deleteOne(tagId: string): Promise<boolean> {
  // TODO: More discrimination between 1 and other counts?
  return (
    (await TagModel.destroy({
      where: {
        id: {
          [Op.eq]: tagId,
        },
      },
    })) === 1
  );
}

export async function getOne(tagId: string): Promise<Tag | null> {
  const record = await TagModel.findOne({
    where: {
      id: {
        [Op.eq]: tagId,
      },
    },
  });
  if (!record) return null;
  return { ...record };
}

export async function save(data: Tag): Promise<Tag> {
  const tag = TagModel.build({
    description: data.description,
    name: data.name,
    parent: data.parent,
  });
  return tag.save();
}
