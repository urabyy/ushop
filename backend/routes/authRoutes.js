import express from "express";

import { users } from "./../controller/authController.js";

const router = express.Router();

router.get("/users", users);

export default router;
