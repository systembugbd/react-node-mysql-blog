import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "./../controller/auth.js";

const router = express.Router();

router.get("/login", loginController);
router.get("/register", registerController);
router.get("/logout", logoutController);

export default router;
