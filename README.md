## Authentication

Right now, the only means of authenticating are with a Google account.

### Using Google

You'll either need to get an OAuth 2.0 client ID and secret from someone who has created one (if you're working on a team)
or you'll need to [create your own Google Cloud app](https://support.google.com/cloud/answer/6158849). Even if someone else has
created an app, there's no harm in creating your own. It won't affect anything, even if you
have a shared database.

You'll use your client ID and secret in the **Environment variables** section below.

## Environment variables

Before attempting to run anything, please be sure to create a `.env` file in the repository root
and add the following (specifying values when needed):

```shell
GOOGLE_CLIENT_ID=my-google-client-id << SEE INSTRUCTIONS ABOVE
GOOGLE_CLIENT_SECRET=my-google-client-secret << SEE INSTRUCTIONS ABOVE
JWT_SECRET=some-random-string-here << FILL THIS OUT
POSTGRES_USER=postgres
POSTGRES_PASSWORD=some-password-here << FLL THIS OUT
POSTGRES_DB=abe2
```

The password and JWT secret can be the result of you randomly pressing keys on your keyboard.
There's really no magic to it.
