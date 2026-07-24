import { Router } from "express";
import { RegisterUser, LoginUser, refreshToken, checkUser, logoutUser } from "../controllers/auth.controller";
import { authnticate, authrize } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/refresh", refreshToken);
router.get("/check", authnticate, authrize("user", "admin", "manager"), checkUser);
router.post("/logout", logoutUser);

export default router;