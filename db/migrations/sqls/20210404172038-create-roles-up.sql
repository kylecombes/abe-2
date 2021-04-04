CREATE ROLE calendar_postgraphile LOGIN PASSWORD 'asupersecretpassword';

CREATE ROLE calendar_anonymous;

GRANT calendar_anonymous TO calendar_postgraphile;

CREATE ROLE calendar_user;

GRANT calendar_user to calendar_postgraphile;
