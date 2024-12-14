import { Request, Response, NextFunction, Router } from "express";
import { getAllPost } from "../controllers/postControllers";
import { getAllComments } from "../controllers/commentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/get-posts', authMiddleware, getAllPost);
router.get('/get-comments', authMiddleware, getAllComments);

export default router;