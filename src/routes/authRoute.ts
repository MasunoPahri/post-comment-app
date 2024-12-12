import express, { Express, Router, Request, Response } from "express";
import { login } from '../controllers/authController';
import { validateLoginPayload } from "../validators/loginValidator";

const router = Router();

router.post('/login', validateLoginPayload, login);

export default router;