import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface registerBody {
    username: string;
    password: string;
    email: string;
}

export const register = async (req: Request, res: Response): Promise<any> => {
    const { username, email, password }: registerBody = req.body;

    const registeredUser = await prisma.user.findUnique({
        where: {username: username}
    });

    // Block create user if exist
    if (registeredUser) {
        return res.status(403).json({
            message: `User ${username} already Registered`
        });
    }

    // Create User
    const decrptPwd  = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
        data: {username, email, password: decrptPwd}
    });

    // Generate token for registered user
    const token = jwt.sign(
        {id : createUser.id},
        process.env.JWT_SECRET as string,
        {expiresIn: '1h'}
    );

    return res.status(201).json({
        token: token,
        message: "You're registered successfully"
    });
}