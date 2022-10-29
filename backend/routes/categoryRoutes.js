import express from "express";
const router = express.Router();

//middleware
import { requireSignin, isAdmin } from "../middlewares/authMiddlewares.js";
//controller
import {
  listCategory,
  readCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";

router.get("/category", listCategory);
router.get("/category/:slug", readCategory);
router.post("/category", requireSignin, isAdmin, createCategory);
router.put("/category/:categoryId", requireSignin, isAdmin, updateCategory);
router.delete("/category/:categoryId", requireSignin, isAdmin, deleteCategory);
export default router;
