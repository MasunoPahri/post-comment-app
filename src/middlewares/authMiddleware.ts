import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    userId? : number
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            message: "Token is Required!"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number }
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
}

export default authMiddleware;