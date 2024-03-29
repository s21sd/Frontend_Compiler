import express from "express";
import { signup, login, logout, userDetails } from "../contoller/userController";
import { verifyToken } from "../middlewares/checkAuthMiddleware";
import { getMyCodes } from "../contoller/compileController";

export const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/userDetails", verifyToken, userDetails)
userRoutes.get("/my-codes", verifyToken, getMyCodes)

