import User from "../modules/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../helper/genrateToken";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/user";
import { token } from "../interfaces/token";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = (await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })) as UserInterface;
    generateToken(newUser, res);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = (await User.findOne({ email })) as UserInterface;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    generateToken(user, res);
    return res
      .status(200)
      .json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET!,
    ) as token;
    const user = await User.findById(decodedToken.id) as UserInterface;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    generateToken(user, res);
    return res
      .status(200)
      .json({ message: "Token refreshed successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserInterface;
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}