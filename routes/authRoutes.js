import express from "express";
import { register, login } from "../controllers/authController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { userSchema } from "../validations/userSchema.js";
const router = express.Router();

const loginSchema = userSchema.pick(["email", "password"]);

router.post("/register", validate(userSchema), register);
router.post("/login",validate(loginSchema), login);

// Example of protected route
router.get("/profile", isAuthenticated, isAdmin, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}`, user: req.user });
});

export default router;