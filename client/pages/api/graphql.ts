import httpProxyMiddleware from 'next-http-proxy-middleware';
import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';
import jwt from 'next-auth/jwt';

const NEXT_JWT_POSTGRAPHILE_JWT_KEY = 'pgJwt';

const jwtSecret = process.env.JWT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify the Next.js JWT
  const session = await getSession({ req });
  if (session) {
    // Get the JWT set by Next.js
    const decodedNextJwt = await jwt.getToken({ req, secret: jwtSecret });

    // Get the PostGraphile JWT
    const postGraphileJwt = decodedNextJwt[NEXT_JWT_POSTGRAPHILE_JWT_KEY];
    if (!postGraphileJwt) {
      console.error(
        'Could not find PostGraphile JWT in the Next JWT: ' + JSON.stringify(decodedNextJwt),
      );
      res.statusCode = 400;
      res.send('Error parsing JWT');
      return;
    }

    // Add the PostGraphile auth bearer token from the cookie
    req.headers.authorization = `Bearer ${postGraphileJwt}`;
  }

  httpProxyMiddleware(req, res, {
    pathRewrite: {
      '^/api': '',
    },
    target: 'http://localhost:5000',
  });
}
