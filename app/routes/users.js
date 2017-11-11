//@flow

import * as users from '../controllers/users';
import express from "express";
const router = express.Router();

router.get('/',users.getAllUsers);

router.get('/:id',users.getUser);

router.post('/',users.createUser);

export default router;