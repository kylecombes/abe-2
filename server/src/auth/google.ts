import { Strategy } from 'passport-google-oauth20';
import { getEnvOrThrow } from '../utils';

const GoogleStrategy = new Strategy(
  {
    callbackURL: `${process.env.BASE_URL || 'https://lvh.me:3000'}/auth/google/callback`,
    clientID: getEnvOrThrow('GOOGLE_CLIENT_ID'),
    clientSecret: getEnvOrThrow('GOOGLE_CLIENT_SECRET'),
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      firstName: profile.name?.givenName,
      googleId: profile.id,
      lastName: profile.name?.familyName,
    };
    done(undefined, user);
  },
);

export default GoogleStrategy;
