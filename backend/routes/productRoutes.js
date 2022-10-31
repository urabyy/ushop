import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//middleware
import { requireSignin, isAdmin } from "../middlewares/authMiddlewares.js";
//controller
import {
  list,
  create,
  read,
  photo,
  remove,
  update,
} from "../controller/productController.js";

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);

router.get("/product/photo/:productId", photo);

router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.delete("/product/:productId", requireSignin, isAdmin, remove);

export default router;
