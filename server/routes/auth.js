import { signup, signin, googleAuth } from "../controllers/auth.js";
import express from "express";

const router = express.Router();

// create user
router.post("/signup", signup)

// Sign in
router.post("/signin", signin)

// Google Auth
router.post("/google", googleAuth)

export default router;