import express from 'express';
import AuthRouter from './auth/index';
import LabelRouter from './labels';
import EventRouter from './events';
import GroupRouter from './groups';
import UserRouter from './users';

const router = express.Router();

// Wire up routers
router.use('/auth', AuthRouter);
router.use('/labels', LabelRouter);
router.use('/events', EventRouter);
router.use('/groups', GroupRouter);
router.use('/users', UserRouter);

export default router;
