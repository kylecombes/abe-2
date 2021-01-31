import express from 'express';
import AuthRouter from './auth/index';
import EventRouter from './events';
import TagRouter from './tags';
import UserRouter from './users';

const router = express.Router();

// Wire up routers
router.use('/auth', AuthRouter);
router.use('/events', EventRouter);
router.use('/tags', TagRouter);
router.use('/users', UserRouter);

export default router;
