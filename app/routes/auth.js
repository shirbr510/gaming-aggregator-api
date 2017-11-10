//@flow

import * as auth from '../controllers/auth';
import express from "express";
const router = express.Router();

router.post('/login',auth.localAuth,auth.localAuthCallback);

export default router;