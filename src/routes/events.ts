import express from 'express';
import validator from 'validator';

import { AuthOptional, AuthRequired } from '../auth';
import { save, getAll, getOne, deleteOne, patch } from '../event-operations';
import { Event, User } from '../types';
import { InternalError } from '../errors';

const router = express.Router();

// Get all events available to the user
router.get('/', AuthOptional, async (req, res) => {
  // TODO: Use req.user to get "private" results
  const events = await getAll();
  res.send(events);
});

router.get('/:eventId', AuthOptional, async (req, res) => {
  const eventId = req.params.eventId;
  if (!validator.isUUID(eventId)) {
    res.status(400).send('Event ID must be a valid UUID.');
    return;
  }
  const event = await getOne(eventId);
  if (!event) {
    res.sendStatus(404);
    return;
  }
  res.send(event);
});

router.patch('/:eventId', AuthRequired, async (req, res) => {
  // TODO: Ensure req.body is actually an Event
  const eventData = req.body as Event;
  const eventId = req.params.eventId;
  try {
    await patch(eventId, eventData);
    res.sendStatus(200);
  } catch (error) {
    if (error instanceof InternalError) {
      res.status(error.httpResponseCode).send(error.forClient);
    } else {
      console.error(error);
      res.sendStatus(500);
    }
  }
});

router.delete('/:eventId', AuthRequired, async (req, res) => {
  const eventId = req.params.eventId;
  if (!validator.isUUID(eventId)) {
    res.status(400).send('Event ID must be a valid UUID.');
    return;
  }
  const deletionSuccessful = await deleteOne(eventId);
  if (!deletionSuccessful) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
});

router.post('/', AuthRequired, async (req, res) => {
  const eventData = req.body;
  try {
    const data = await save(eventData, (req.user as any).user as User);
    res.send({
      addedEventId: data.id,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: {
        message: 'An error occurred.',
      },
      success: false,
    });
  }
});

export default router;
