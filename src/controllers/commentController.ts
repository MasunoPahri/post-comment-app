import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { promises } from "dns";

const prisma = new PrismaClient();

interface CommentBody {
    postId: number;
    content: string;
}

export const getAllComments = async (req: Request, res: Response): Promise<any> => {
    try {
        const { postId, cursor } = req.query;

        // Check related post
        const postEntity = await prisma.post.findUnique({
            where: {id: parseInt(postId as string, 10)}
        });
        if (!postEntity) {
            return res.status(404).json({
                message: "Post does not exist"
            });
        }

        // Fetch All Comments
        const allComments = await prisma.comment.findMany();

        return res.status(200).json({
            results: allComments
        });


    } catch (error) {
        return res.status(500).json({error})
    }
}