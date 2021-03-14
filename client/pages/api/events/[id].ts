import { AxiosRequestConfig } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { makeBackendRequest } from '../../../util/backend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle 404, etc better
  const eventData = await makeBackendRequest(`/events/${req.query.id}`, req.method as AxiosRequestConfig['method']);
  res.status(200).json(eventData)
}