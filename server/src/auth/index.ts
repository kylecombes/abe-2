import express from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { getEnvOrThrow } from '../utils';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';

export function initializeAuth(app: express.Application): void {
  // Initialize Passport
  app.use(passport.initialize());

  // Configure JSON web tokens (JWT) to be our primary mode of authorization
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: getEnvOrThrow('JWT_SECRET'),
      },
      async (token, done) => {
        try {
          return done(null, token);
        } catch (error) {
          done(error);
        }
      },
    ),
  );

  // Allow routes to get access to an authenticated user's info while still being publicly accessible
  passport.use(new AnonymousStrategy());
}

// Define authorization checks
export const AuthOptional = passport.authenticate(['jwt', 'anonymous'], { session: false });
export const AuthRequired = passport.authenticate('jwt', { session: false });
