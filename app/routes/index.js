// @flow
import users from './users'

import express from "express";
const router = express.Router();

router.use('/users',users);

export default router;