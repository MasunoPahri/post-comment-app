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
        const itemPerPage = 25;
        const dataSkip    = cursor ? 1 : 0;
        const dataCursor  = cursor ? { id: parseInt(cursor as string, 10) } : undefined;
        const allComments = await prisma.comment.findMany({
            take: itemPerPage,
            skip: dataSkip,
            cursor: dataCursor,
            orderBy: {
                id: "asc"
            }
        });

        const nextCursor = allComments.length > 0 ? allComments[allComments.length - 1].id : null;

        return res.status(200).json({
            results: allComments,
            nextCursor
        });


    } catch (error) {
        return res.status(500).json({error})
    }
}