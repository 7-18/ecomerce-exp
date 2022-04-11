import express from 'express';
import User from '../controllers/User.js';
import admin from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';
import validId from '../middlewares/validId.js';

const router = express.Router();

router.post("/register", User.registerUser);
router.post("/login", User.login);
router.get("/list", auth, admin, User.listUsers);
router.get("/find/:_id", auth, admin, validId, User.findUser);
router.get("/getUserRole/:email", auth, User.getUserRole);
router.put("/update/", auth, admin, User.updateUser);
router.delete("/delete/:_id", auth, admin, User.deleteUser);

export default router;