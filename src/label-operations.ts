import { Op } from 'sequelize';

import { LabelModel } from './db/models/label';
import { Label } from './types';

export async function getAll(): Promise<Label[]> {
  return await LabelModel.findAll();
}

export async function deleteOne(labelId: string): Promise<boolean> {
  // TODO: More discrimination between 1 and other counts?
  return (
    (await LabelModel.destroy({
      where: {
        id: {
          [Op.eq]: labelId,
        },
      },
    })) === 1
  );
}

export async function getOne(labelId: string): Promise<Label | null> {
  const record = await LabelModel.findOne({
    where: {
      id: {
        [Op.eq]: labelId,
      },
    },
  });
  if (!record) return null;
  return { ...record };
}

export async function save(data: Label): Promise<Label> {
  const label = LabelModel.build({
    description: data.description,
    name: data.name,
    parent: data.parent,
  });
  return label.save();
}
