import { Request, Response, NextFunction } from "express";

export const validateRegisterPayload = (req: Request, res: Response, next: NextFunction): void  => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        res.status(422).json({
            message: "Username or Password is Required"
        });
        return;
    }

    next();
}