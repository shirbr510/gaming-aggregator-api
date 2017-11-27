// @flow
import users from './users'
import auth from './auth'
import * as steamWorker from '../workers/SteamWorker';

import express from "express";
const router = express.Router();

router.get('/games-worker-test',steamWorker.runGamesWorker)
router.get('/user-worker-test',steamWorker.runUserWorker)
router.use('/auth',auth);
router.use('/users',users);

export default router;