import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import checkAuth from "../middlewares/checkAuthMiddleware";
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists!" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email: email,
            password: hashedPassword,
            username: username,
        });
        return res.status(201).send({ user });
    } catch (error) {
        return res.status(500).send({ message: "Error signing up!", error: error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).send({ message: "User not found" });
        }

        const passwordMatched = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!passwordMatched) {
            return res.status(400).send({ message: "Wrong password" });
        }

        // const token = jwt.sign({ id: existingUser._id }, process.env.JWT_KEY!, { expiresIn: '20m' });

        // res.cookie('token', token, {
        //     sameSite: 'none',
        //     httpOnly: true,
        //     secure: true
        // });
        // res.status(200).json({
        //     token,
        //     message: "User logged in successfully",
        //     user: existingUser
        // });

        const jwtToken = jwt.sign(
            {
                _id: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!, {
            expiresIn: "20m"
        }
        );

        res.cookie('token', jwtToken, { httpOnly: true });

        return res.status(200).send({ message: 'Login successful!', user: existingUser });
    } catch (error) {
        return res.status(500).send({ message: "Error logging in!", error: error });
    }
};


export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        return res.status(200).send({ message: "logged out successfully!" });
    } catch (error) {
        return res.status(500).send({ message: "Error logging out!", error });
    }
};



export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    checkAuth(req, res, (err) => {
        if (err) {
            return res.status(401).json({
                message: "User is not logged in",
            });
        }
        return res.status(200).json({
            message: "User is logged in",
        });
    });
};







