import express from "express";
import Product from "../controllers/Product.js";
import multiparty from "connect-multiparty";
import upload from "../middlewares/formatFile.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const mult = multiparty();
const router = express.Router();

router.post("/createProduct", Product.createProduct);
router.get("/listProducts", Product.listProducts);
router.put("/updateProduct/", auth, admin, Product.updateProduct);
router.delete("/deleteProduct/:_id", auth, admin, Product.deleteProduct);
router.get("/findProduct/:_id", Product.findProduct);

export default router;