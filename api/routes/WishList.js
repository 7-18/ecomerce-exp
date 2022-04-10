import express from "express";
import WishList from "../controllers/WishList.js";
import admin from "../middlewares/admin.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/addWishList", auth, WishList.addWishList);
router.put("/updateWishList/", auth, WishList.updateWishList);
router.delete("/deleteWishList/:_id", auth, WishList.deleteWishList);
router.get("/getUserWishList/:_id", auth, WishList.getUserWishList);

export default router;