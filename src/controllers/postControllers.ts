import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid4 } from "uuid";
import multer from "multer";
import multerS3 from 'multer-s3';
import { S3 } from "aws-sdk";

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

const s3 = new S3 ({
    endpoint: process.env.BUCKET_ENDPOINT,
    accessKeyId: process.env.ACCESS_KEY_ID || 'default',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || 'default',
    region: 'sgp1',
    signatureVersion: 'v4'
});

const generateRandomFileName = (extension: string): string => {
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ''); // Remove characters like "-" and ":" from ISO string
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string of 8 characters
    return `${timestamp}-${randomString}${extension}`; // Combine timestamp with random string
};

export const createPost = async (req: Request, res: Response): Promise<any> => {
    const userId = (req as any).userId; 

    const { title, content, media, mediaType, extension, isPrivate } = req.body;

    if (!media || !validateMediaType(mediaType)) {
        return res.status(404).json({
            error: "Invalid media type or no media provided"
        });
    }

    const fileName = generateRandomFileName(extension);
    const buffer = Buffer.from(media, 'base64');
    const params = {
        Bucket: 'ucbucket',
        Key: fileName,
        Body: buffer,
        ACL: 'public-read',
        ContentType: mediaType,
    };

    try {
        const upload = multer({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 2 * 1024 * 1024, // limit file size to 2MB
            },
        });

        const uploadResult = await s3.upload(params).promise();

        // Mocking media dimension 
        const dimension = mediaType.startsWith('image') ? { width: 1920, height: 1080 } : { width: 1280, height: 720 };

        const savePost = await prisma.post.create({
            data: {
                title,
                content,
                mediaUrl: uploadResult.Location,
                mediaType,
                extension,
                isPrivate,
                userId,
                mediaWidth: dimension.width,
                mediaHeight: dimension.height
            }
        });

        return res.status(201).json({
            message: "Post saved successfully",
            fileUrl: uploadResult.Location,
            fileKey: uploadResult.Key
        });

    } catch (error) {
        const err = error as Error;
        return res.status(500).json({
            message: err.message || 'Something Error'
        });
    }
}