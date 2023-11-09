import express from 'express';
import { login } from '../controllers/login.js';
import { validate, register } from '../controllers/register.js';
import { verifyToken } from '../middleware/auth.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/tasks.js'

const router = express.Router();

router.post("/register", validate('register'), register);

router.post("/login", login);

router.post("/tasks", verifyToken, createTask);

router.get("/tasks", verifyToken, getTasks);

router.put("/tasks/:id", verifyToken, updateTask);

router.delete("/tasks/:id", verifyToken, deleteTask);

export default router;