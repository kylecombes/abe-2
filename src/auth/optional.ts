import passport from 'passport';

export const AuthOptional = passport.authenticate(['jwt', 'anonymous'], { session: false });
