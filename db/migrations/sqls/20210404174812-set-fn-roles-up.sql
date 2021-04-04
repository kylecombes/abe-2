ALTER DEFAULT privileges REVOKE EXECUTE ON functions FROM public;

GRANT usage ON SCHEMA calendar TO calendar_anonymous, calendar_user;

GRANT EXECUTE ON FUNCTION calendar.authenticate (text) TO calendar_anonymous, calendar_user;

GRANT SELECT ON TABLE calendar.event TO calendar_anonymous;

GRANT ALL privileges ON TABLE calendar.event TO calendar_user;
GRANT ALL privileges ON TABLE calendar.user TO calendar_user;
GRANT usage ON SEQUENCE calendar.event_id_seq TO calendar_user;