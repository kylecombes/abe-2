import express from 'express';
import { AuthOptional, AuthRequired } from '../auth';
import { save, getAll } from '../event-operations';
import { User } from '../types';

const router = express.Router();

// Get all events available to the user
router.get('/', AuthOptional, async (req, res) => {
  // TODO: Use req.user to get "private" results
  const events = await getAll();
  res.send(events);
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
