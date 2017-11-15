//@flow

import * as auth from '../controllers/auth';
import express from "express";
const router = express.Router();

router.post('/login',auth.localAuth,auth.localAuthCallback);
router.get('/steam/login',auth.steamAuth);
router.get('/steam/return',auth.steamAuthCallback);

export default router;