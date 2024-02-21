import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: any;
}

const checkAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("CheckAuth called")
    const authToken = req.cookies.token;
    console.log(authToken);
    if (!authToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const secretKey = process.env.JWT_KEY;
    jwt.verify(authToken, secretKey as Secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded.user;
        next();
    });
};

export default checkAuth;
