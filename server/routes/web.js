import express from 'express';
import { login } from '../controllers/login.js';
import { register } from '../controllers/register.js';
import { verifyToken } from '../middleware/auth.js';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todos.js'

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/todos", verifyToken, createTodo);

router.get("/todos", verifyToken, getTodos);

router.put("/todos/:id", verifyToken, updateTodo);

router.delete("/todos/:id", verifyToken, deleteTodo);

export default router;