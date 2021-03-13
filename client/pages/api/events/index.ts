import { NextApiRequest, NextApiResponse } from 'next';
import { makeBackendRequest } from '../../../util/backend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventData = await makeBackendRequest(`/events`);
  res.status(200).json(eventData)
}