import express from 'express';
import { router as apiRouter } from './api/api.routes';

export const router = express.Router();

router.use('/api', apiRouter);
