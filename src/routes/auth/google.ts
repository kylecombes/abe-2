import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import GoogleStrategy from '../../auth/google';
import { getEnvOrThrow } from '../../utils';

passport.use(GoogleStrategy);

const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['profile'], session: false }));

router.get('/callback', async (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (!user) {
      console.error('No user');
      res.sendStatus(404);
    } else {
      // Successful authentication
      // TODO: Look up the user in the database and convert their Google ID into their DB ID

      // Create and sign a JWT with the user's ID
      const token = jwt.sign({ user }, getEnvOrThrow('JWT_SECRET'));
      res.json({ token });
    }
  })(req, res, next);
});

export default router;
