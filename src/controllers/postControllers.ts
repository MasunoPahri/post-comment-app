import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid4 } from "uuid";

const prisma = new PrismaClient();

interface PostBody {
    title: string;
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

function validateMediaType(mediaType: string): boolean {
    const allowedMimeTypes = [
        'image/png', 
        'image/jpeg', 
        'image/jpg',
        'image/gif',
        'video/mp4',
        'video/mpeg'
    ];
    return allowedMimeTypes.includes(mediaType);
}

export const createPost = async (req: Request, res: Response): Promise<any> => {
    const userId = (req as any).userId; 

    const { title, content, media, mediaType, isPrivate } = req.body;

    if (!media || !validateMediaType(mediaType)) {
        return res.status(404).json({
            error: "Invalid media type or no media provided"
        });
    }

    try {    
        // Mocking dimension and cloudurl returned
        const dimension     = mediaType.startsWith('image') ? { width: 1920, height: 1080 } : { width: 1280, height: 720 }
        const cloudFileUrl  = `https://dummycloudurl.com/${uuid4()}`;

        const savePost = await prisma.post.create({
            data: {
                title,
                content,
                mediaUrl: cloudFileUrl,
                mediaType,
                isPrivate,
                userId,
                mediaWidth: dimension.width,
                mediaHeight: dimension.height
            }
        });

        res.status(201).json(savePost);

    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}