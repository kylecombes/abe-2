import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import GoogleStrategy from '../../auth/google';
import { getEnvOrThrow } from '../../utils';
import { getOrCreateUserByConnectedAccountId } from '../../user';

passport.use(GoogleStrategy);

const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['profile'], session: false }));

router.get('/callback', async (req, res, next) => {
  passport.authenticate('google', async (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (!user) {
      console.error('No user');
      res.sendStatus(404);
    } else {
      // Successful authentication
      // TODO: Look up the user in the database and convert their Google ID into their DB ID
      const userData = await getOrCreateUserByConnectedAccountId(
        {
          name: {
            display: `${user.firstName} ${user.lastName}`,
            first: user.firstName as string,
            last: user.lastName as string,
          },
        },
        { accountId: user.googleId, provider: 'google' },
      );

      // Create and sign a JWT with the user's ID
      const jwtPayload = {
        user: {
          displayName: userData.name.display,
          id: userData.id,
        },
      };
      const token = jwt.sign(jwtPayload, getEnvOrThrow('JWT_SECRET'));
      res.json({ token });
    }
  })(req, res, next);
});

export default router;
