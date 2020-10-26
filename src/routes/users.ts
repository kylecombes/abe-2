import express from 'express';
import validator from 'validator';

import { AuthOptional, AuthRequired } from '../auth';
import { getAll, getOne, deleteOne, patch } from '../user-operations';
import { User } from '../types';
import { InternalError } from '../errors';

const router = express.Router();

// Get all users available to the user
router.get('/', AuthOptional, async (req, res) => {
  // TODO: Use req.user to get "private" results
  const users = await getAll();
  res.send(users);
});

router.get('/:userId', AuthOptional, async (req, res) => {
  const userId = req.params.userId;
  if (!validator.isUUID(userId)) {
    res.status(400).send('User ID must be a valid UUID.');
    return;
  }
  const user = await getOne(userId);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.send(user);
});

router.patch('/:userId', AuthRequired, async (req, res) => {
  // TODO: Ensure req.body is actually a User
  const userData = req.body as User;
  const userId = req.params.userId;
  try {
    await patch(userId, userData);
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

router.delete('/:userId', AuthRequired, async (req, res) => {
  const userId = req.params.userId;
  if (!validator.isUUID(userId)) {
    res.status(400).send('User ID must be a valid UUID.');
    return;
  }
  const deletionSuccessful = await deleteOne(userId);
  if (!deletionSuccessful) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
});

export default router;
