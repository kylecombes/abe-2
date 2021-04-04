CREATE TABLE calendar.event (
  id serial PRIMARY KEY,
  created_by_id integer REFERENCES calendar.user (id) NOT NULL,
  title varchar(50) NOT NULL,
  description text,
  when_with_times tstzrange,
  when_no_times daterange,
  created_at timestamptz DEFAULT now(),
  last_updated_at timestamptz
);

COMMENT ON TABLE calendar.event IS 'A calendar event';
COMMENT ON COLUMN calendar.event.id IS 'The primary unique identifier for the event';
COMMENT ON COLUMN calendar.event.title IS 'A short title for the event';
COMMENT ON COLUMN calendar.event.description IS 'A longer description with details about the event';
COMMENT ON COLUMN calendar.event.when_with_times IS 'The start and end datetime information for the event, if the start and end have both date and time information';
COMMENT ON COLUMN calendar.event.when_no_times IS 'The start and end dates for the event, if the start and end have no time information';
COMMENT ON calendar.event.created_by_id IS '@omit create,update
The user who originally added the event';
COMMENT ON COLUMN calendar.event.created_at IS '@omit create,update
When the event was originally created';
COMMENT ON COLUMN calendar.event.last_updated_at IS '@omit create,update
When the event was last updated';