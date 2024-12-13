import { Request, Response, NextFunction, Router } from "express";
import { getAllPost } from "../controllers/postControllers";

const router = Router();

router.get('', getAllPost);

export default router;