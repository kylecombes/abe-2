CREATE FUNCTION calendar.authenticate (
    email text
  ) RETURNS calendar.jwt
  AS $$
DECLARE
  login_info calendar_private.user_login;
BEGIN
  SELECT
    * INTO login_info
  FROM
    calendar_private.user_login
  WHERE
    login_info.email = authenticate.email;
  IF login_info.user_id IS NOT NULL THEN
    RETURN (
      'calendar_user',
      login_info.user_id,
      extract(epoch FROM (now() + interval '30 days'))
    )::calendar.jwt;
  ELSE
    RETURN NULL;
  END IF;
END;
$$
LANGUAGE plpgsql
STRICT
SECURITY DEFINER;
