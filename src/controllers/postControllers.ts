import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PostBody {
    title: string;
    content: string;
}

interface CommentBody {
    postId: number;
    content: string;
}

export const getAllPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        // const posts = await prisma
        return res.status(200).json({ message: " " });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}