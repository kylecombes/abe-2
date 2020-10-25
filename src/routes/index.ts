import express from 'express';
import AuthRouter from './auth/index';
import LabelRouter from './labels';
import EventRouter from './events';
import GroupRouter from './groups';

const router = express.Router();

// Wire up routers
router.use('/auth', AuthRouter);
router.use('/labels', LabelRouter);
router.use('/events', EventRouter);
router.use('/groups', GroupRouter);

export default router;
