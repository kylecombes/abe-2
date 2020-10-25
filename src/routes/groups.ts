import express from 'express';
import validator from 'validator';

import { AuthOptional, AuthRequired } from '../auth';
import { save, getAll, getOne, deleteOne } from '../group-operations';

const router = express.Router();

// Get all groups of which the user is a member
router.get('/', AuthRequired, async (req, res) => {
  // TODO: Use req.user to get "private" results
  const groups = await getAll();
  res.send(groups);
});

router.get('/:groupId', AuthOptional, async (req, res) => {
  const groupId = req.params.groupId;
  if (!validator.isUUID(groupId)) {
    res.status(400).send('Group ID must be a valid UUID.');
    return;
  }
  const group = await getOne(groupId);
  if (!group) {
    res.sendStatus(404);
    return;
  }
  res.send(group);
});

router.delete('/:groupId', AuthRequired, async (req, res) => {
  const groupId = req.params.groupId;
  if (!validator.isUUID(groupId)) {
    res.status(400).send('Group ID must be a valid UUID.');
    return;
  }
  const deletionSuccessful = await deleteOne(groupId);
  if (!deletionSuccessful) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
});

router.post('/', AuthRequired, async (req, res) => {
  const groupData = req.body;
  try {
    const data = await save(groupData);
    res.send({
      addedGroupId: data.id,
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
