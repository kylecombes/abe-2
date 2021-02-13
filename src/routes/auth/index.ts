import express from 'express';
import GoogleAuthRoutes from './google';
import { AuthRequired } from '../../auth';

const router = express.Router();

router.get('/me', AuthRequired, (req, res) => {
  res.send(req.user);
});

router.use('/google', GoogleAuthRoutes);

export default router;
