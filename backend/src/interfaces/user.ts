import mongoose from "mongoose";

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
    MANAGER = "manager",
}
export interface UserInterface {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}