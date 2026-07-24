import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/user";
import { token } from "../interfaces/token";
import User from "../modules/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface;
        }
    }
}

export const authnticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as token;
        const user = await User.findById(decodedToken.id) as UserInterface;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
    
export const authrize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as UserInterface;
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}