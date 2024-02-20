import express from "express";
import { signup, login, logout } from "../contoller/userController";
export const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout); 