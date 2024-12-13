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

export const getAllPost = async (req: Request, res: Response): Promise<any> => {
    try {

        // Fetch a post when accessed with param
        const { postId } = req.query;
        if (postId) {
            const findPost = await prisma.post.findUnique({
                where: { id: parseInt(postId as string, 10) }
            });
    
            if (!findPost) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }
    
            return res.status(200).json(findPost);
        } 

        // Fetch All Post when accessed without param
        const allPost = await prisma.post.findMany();

        return res.status(200).json({
            results: allPost
        });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}