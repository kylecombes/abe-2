import express from 'express';
import { AuthOptional } from '../auth/optional';
import { getAll } from '../event-operations';

const router = express.Router();

// Get all events available to the user
router.get('/', AuthOptional, async (req, res) => {
  // TODO: Use req.user to get "private" results
  const events = await getAll();
  res.send(events);
});

export default router;
