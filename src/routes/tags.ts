import express from 'express';
import validator from 'validator';

import { AuthOptional, AuthRequired } from '../auth';
import { save, getAll, getOne, deleteOne } from '../tag-operations';

const router = express.Router();

// Get all tags available to the user
router.get('/', AuthOptional, async (req, res) => {
  // TODO: Use req.user to get "private" results
  const tags = await getAll();
  res.send(tags);
});

router.get('/:tagId', AuthOptional, async (req, res) => {
  const tagId = req.params.tagId;
  if (!validator.isUUID(tagId)) {
    res.status(400).send('Tag ID must be a valid UUID.');
    return;
  }
  const tag = await getOne(tagId);
  if (!tag) {
    res.sendStatus(404);
    return;
  }
  res.send(tag);
});

router.delete('/:tagId', AuthRequired, async (req, res) => {
  const tagId = req.params.tagId;
  if (!validator.isUUID(tagId)) {
    res.status(400).send('Tag ID must be a valid UUID.');
    return;
  }
  const deletionSuccessful = await deleteOne(tagId);
  if (!deletionSuccessful) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
});

router.post('/', AuthRequired, async (req, res) => {
  const tagData = req.body;
  try {
    const data = await save(tagData);
    res.send({
      addedTagId: data.id,
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
