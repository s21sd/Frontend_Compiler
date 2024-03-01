import { Request, Response, NextFunction } from "express";
import dotenv, { config } from 'dotenv'
config();
import jwt, { Secret } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: any;
}

const checkAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("CheckAuth called")
    const authToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkdmJfMmNGcnJWemhDUW0ycXZjY0N0ZmlrRnRxeXJEIiwiaWQiOiJjbGllbnRfMmNZVzhRTUV6SEpsVFJtS0dkWGFTZDBRWlpmIiwicm90YXRpbmdfdG9rZW4iOiIydTFhMjg4amFxdXdmdzB0Y3lseGN0djEyZHUxMXliYm8wazIwcjZnIn0.uUnm3QKE57y-Rswo8F37hXZAO0tzgvSC1QkPfrXeIIO1rqyDoRUrAe3iKT6R4EpvOZKwVY7mim_XuVUNvNv9wNtKPsQg_pv_ZkQYQG3aXlYNl3E9CbkcNqlAMr-3nii0bgayovi7mIalSnzod1t3v4R8YFRLuREEm_x-4-hNUv7O1Z9iYx5RF1rgi5Ei9FwNFaN8Om5CLtlpY8yxVzkGU7IO2U3tB1IiYlAZSnVInjUGADHw9LaSywbDP3z3vdtCMcyF68MLLAIbm7xVOJE6dR2GQrKMnuftz8qyo_hqHn6Q_BqLLZyCNmSc8BuQOeZesx5XkmtW6HZFvXrcxTvjtw'
    // const authToken = req.cookies.token;
    // console.log("Token", authToken);
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
