CREATE SCHEMA calendar_private;

CREATE TABLE calendar_private.user_login (
  user_id integer PRIMARY KEY REFERENCES calendar.user (id) ON DELETE CASCADE,
  email varchar(40) UNIQUE NOT NULL
);

COMMENT ON TABLE calendar_private.user_login IS 'Private login information for each user';
COMMENT ON COLUMN calendar_private.user_login.user_id IS E'The user\'s ID';
COMMENT ON COLUMN calendar_private.user_login.email IS E'The user\'s email address';
