import express from "express"

import { LogIn, LogOut, Signup, verifyEmail } from "../controllers/controllers.js"

const router = express.Router()

router.post("/signup", Signup)

router.post("/send-otp", verifyEmail);


router.post("/login", LogIn)

router.post("/logout", LogOut)

export default router