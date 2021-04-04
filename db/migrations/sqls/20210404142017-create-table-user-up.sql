CREATE TABLE calendar.user (
  id serial PRIMARY KEY,
  avatar_url text,
  full_name varchar(40) NOT NULL
);

COMMENT ON TABLE calendar.user IS 'A user who has created an account by signing in';
COMMENT ON COLUMN calendar.user.id IS 'The primary unique identifier for the user';
COMMENT ON COLUMN calendar.user.avatar_url IS 'A URL to an avatar (aka profile image) for the user';
COMMENT ON COLUMN calendar.user.full_name IS 'The full name of the user';
