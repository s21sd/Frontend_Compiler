import { Request, Response, NextFunction } from "express";
import dotenv, { config } from 'dotenv'
config();
import jwt, { Secret } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: any;
}

const checkAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("CheckAuth called")
    // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0NTY3YTZhZjg2MThiODY0NTFjZGEiLCJlbWFpbCI6InN1bm55c3JpdmFzdGF2YTI1OEBnbWFpbC5jb20iLCJpYXQiOjE3MDk5ODIzMTksImV4cCI6MTcwOTk4MzUxOX0.NFQ6BZUGpdJ2O77CDXEWVlntJUHUcAvPq9SIPVKDWjU';
    const authToken = req.cookies.token;
    console.log("Token", authToken);
    if (!authToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const secretKey = process.env.JWT_KEY;
    jwt.verify(authToken, secretKey as Secret, (err: any, decoded: any) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded.user;
        next();
    });
};

export default checkAuth;
