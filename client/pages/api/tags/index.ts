import { NextApiRequest, NextApiResponse } from 'next';
import { makeBackendRequest } from '../../../util/backend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(await makeBackendRequest(`/tags`));
      break;
    case 'POST':
      res.status(200).json(await makeBackendRequest('/tags', 'post', req.body));
      break;
    default:
      res.status(404);
  }
}
