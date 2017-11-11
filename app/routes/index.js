// @flow
import users from './users'
import auth from './auth'

import express from "express";
const router = express.Router();

router.use('/auth',auth);
router.use('/users',users);

export default router;