import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface loginBody {
    username: string;
    password: string;
}

export const login = async (req: Request, res: Response): Promise<any> => {
    const {username, password}: loginBody = req.body;

    const user = await prisma.user.findUnique({
        where: {username: username}
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    const comaprePwd = await bcrypt.compare(password, user.password);
    if (!user || !comaprePwd) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {id : user.id},
        process.env.JWT_SECRET as string,
        {expiresIn: '1h'}
    );

    return res.status(200).json({ token })
}