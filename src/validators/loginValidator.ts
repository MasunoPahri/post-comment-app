import { Request, Response, NextFunction } from "express";

export const validateLoginPayload = (req: Request, res: Response, next: NextFunction): void  => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(422).json({
            message: "Username or Password is Required"
        });
        return;
    }

    next();
}