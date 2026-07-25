import jwt from "jsonwebtoken";
import { Response, CookieOptions } from "express";
import { UserInterface } from "../interfaces/user";

const ACCESS_TOKEN_EXPIRY_MS = 1000 * 60 * 15;
const REFRESH_TOKEN_EXPIRY_MS = 1000 * 60 * 60 * 24 * 7;

export const getCookieOptions = (): CookieOptions => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };
};

export const generateToken = (user: UserInterface, res: Response) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    const accessToken = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY_MS / 1000,
    });

    const refreshToken = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY_MS / 1000,
    });

    const options = getCookieOptions();

    res.cookie("accessToken", accessToken, {
        ...options,
        maxAge: ACCESS_TOKEN_EXPIRY_MS,
    });

    res.cookie("refreshToken", refreshToken, {
        ...options,
        maxAge: REFRESH_TOKEN_EXPIRY_MS,
    });

    return { accessToken, refreshToken };
};