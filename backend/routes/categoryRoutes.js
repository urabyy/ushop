import express from "express";
const router = express.Router();

//middleware
import { requireSignin, isAdmin } from "../middlewares/authMiddlewares.js";
//controller
import {
  list,
  read,
  create,
  update,
  remove,
} from "../controller/categoryController.js";

router.get("/categories", list);
router.get("/category/:slug", read);
router.post("/category", requireSignin, isAdmin, create);
router.put("/category/:categoryId", requireSignin, isAdmin, update);
router.delete("/category/:categoryId", requireSignin, isAdmin, remove);
export default router;
