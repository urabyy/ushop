import express from "express";

import { register, login, secret } from "./../controller/authController.js";

const router = express.Router();

//middleware
import { requireSignin, isAdmin } from "./../middlewares/authMiddlewares.js";

router.post("/register", register);
router.post("/login", login);
//test
router.get("/secret", requireSignin, isAdmin, secret);

export default router;
