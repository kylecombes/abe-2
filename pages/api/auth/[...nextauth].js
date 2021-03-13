import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL,
  providers: [
    // OAuth authentication providers...
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
})