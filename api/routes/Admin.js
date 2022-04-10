import express from "express";
import Admin from "../controllers/Admin.js";
import admin from "../middlewares/admin.js";
import auth from "../middlewares/auth.js";
import validId from "../middlewares/validId.js";

const router = express.Router();

router.post("/registerAdmin", auth, admin, Admin.registerAdmin);
router.get("/listAdmin", auth, admin, Admin.listAdmin);
router.get("/findAdmin/:_id", auth, admin, validId, Admin.findAdmin);
router.put("/updateAdmin/", auth, admin, Admin.updateAdmin);
router.delete("/deleteAdmin/:_id", auth, admin, validId, Admin.deleteAdmin);

export default router;