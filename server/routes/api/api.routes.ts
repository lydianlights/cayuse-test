import express from 'express';
import { LocationController } from 'controllers/location.controller';

const locationCtrl = new LocationController();

export const router = express.Router();

router.get('/location-data', locationCtrl.getLocationData);
