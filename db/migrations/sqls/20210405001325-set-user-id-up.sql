CREATE FUNCTION calendar_private.set_user_id ()
  RETURNS TRIGGER
  AS $$
BEGIN
  NEW.created_by_id := current_setting('jwt.claims.user_id');
  RETURN new;
END
$$
LANGUAGE plpgsql;

CREATE TRIGGER event_person_id
  BEFORE INSERT ON calendar.event FOR EACH ROW
  EXECUTE PROCEDURE calendar_private.set_user_id ();
