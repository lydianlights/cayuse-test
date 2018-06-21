import express from 'express';
import testCtrl from 'controllers/test.controller';

export const router = express.Router();

router.get('/status', testCtrl.getStatus);
