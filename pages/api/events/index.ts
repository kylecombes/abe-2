import { NextApiRequest, NextApiResponse } from 'next/types';
import { getAll } from '../../../util/ops/event-operations';


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const events = await getAll();
  res.status(200).json(events);
}