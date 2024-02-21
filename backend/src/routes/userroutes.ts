import express from "express";
import { Request, Response, NextFunction } from "express";
import { signup, login, logout } from "../contoller/userController";
import checkAuth from "../middlewares/checkAuthMiddleware";
export const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
// userRoutes.get("/checklogin", checkLogin)

interface AuthenticatedRequest extends Request {
    user?: any;
}
userRoutes.get('/checklogin', checkAuth, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: "User is logged in ",
    });
});