import express from 'express';
import validator from 'validator';

import { AuthOptional, AuthRequired } from '../auth';
import { save, getAll, getOne, deleteOne } from '../label-operations';

const router = express.Router();

// Get all labels available to the user
router.get('/', AuthOptional, async (req, res) => {
  // TODO: Use req.user to get "private" results
  const labels = await getAll();
  res.send(labels);
});

router.get('/:labelId', AuthOptional, async (req, res) => {
  const labelId = req.params.labelId;
  if (!validator.isUUID(labelId)) {
    res.status(400).send('Label ID must be a valid UUID.');
    return;
  }
  const label = await getOne(labelId);
  if (!label) {
    res.sendStatus(404);
    return;
  }
  res.send(label);
});

router.delete('/:labelId', AuthRequired, async (req, res) => {
  const labelId = req.params.labelId;
  if (!validator.isUUID(labelId)) {
    res.status(400).send('Label ID must be a valid UUID.');
    return;
  }
  const deletionSuccessful = await deleteOne(labelId);
  if (!deletionSuccessful) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
});

router.post('/', AuthRequired, async (req, res) => {
  const labelData = req.body;
  try {
    const data = await save(labelData);
    res.send({
      addedLabelId: data.id,
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
