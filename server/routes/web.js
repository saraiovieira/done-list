import express from 'express';
import { login } from '../controllers/login.js';
import { register } from '../controllers/register.js';
import { verifyToken } from '../middleware/auth.js';
import { todoCreate, todos, todoUpdate, todoDelete } from '../controllers/todos.js'

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/todos", verifyToken, todoCreate);

router.get("/todos", verifyToken, todos);

router.put("/todos/:id", verifyToken, todoUpdate);

router.delete("/todos/:id", verifyToken, todoDelete);

export default router;