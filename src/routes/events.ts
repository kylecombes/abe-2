import express from 'express';
import { getAll } from '../event-operations';

const router = express.Router();

// Get all events available to the user
// TODO: Add auth
router.get('/', async (req, res) => {
  const events = await getAll();
  res.send(events);
});

export default router;
