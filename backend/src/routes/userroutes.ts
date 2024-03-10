import express from "express";
import { Request, Response, NextFunction } from "express";
import { signup, login, logout,checkLogin } from "../contoller/userController";

export const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
// userRoutes.get("/checklogin", checkLogin)

