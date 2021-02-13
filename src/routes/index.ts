import express from 'express';
import AuthRouter from './auth/index';
import EventRouter from './events';

const router = express.Router();

// Wire up routers
router.use('/auth', AuthRouter);
router.use('/events', EventRouter);

export default router;
