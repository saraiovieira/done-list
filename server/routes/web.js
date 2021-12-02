import express from 'express';
import { login } from '../controllers/login.js';
import { register } from '../controllers/register.js';
import { welcome } from '../controllers/home.js'
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/welcome", verifyToken, welcome);

export default router;