import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { getPostGraphileJWT } from '../../../api-utils/api-utils';

export default NextAuth({
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: async (token, user, account, profile) => {
      if (profile) {
        const postGraphileJWT = await getPostGraphileJWT(profile.email);
        token.pgJwt = postGraphileJWT;
      }

      return token;
    },
  },
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL,
  providers: [
    // OAuth authentication providers...
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
});
