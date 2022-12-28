import express from 'express';
import { login, register } from '../controllers/authController.js';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/userController.js';
import verifyToken from '../middleware/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/user/:id', verifyToken, getUser);
router.get('/users', verifyToken, getUsers);
router.post('/user', verifyToken, createUser)
router.put('/user/:id', verifyToken, updateUser);
router.delete('/user/:id', verifyToken, deleteUser);




export default router;