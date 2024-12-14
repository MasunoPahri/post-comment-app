import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    userId? : number
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {

    try {
        const token = req.headers.authorization?.split(' ')[1];
    
        if (!token) {
            res.status(403).json({
                message: "Token is Required!"
            });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number }
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or Expired Token"
        });
        return;
    }
}

export default authMiddleware;