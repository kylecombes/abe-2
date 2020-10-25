import express from 'express';
import AuthRouter from './auth/index';
import LabelRouter from './labels';
import EventRouter from './events';

const router = express.Router();

// Wire up routers
router.use('/auth', AuthRouter);
router.use('/labels', LabelRouter);
router.use('/events', EventRouter);

export default router;
