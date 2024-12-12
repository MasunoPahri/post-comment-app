import express, { Express, Router, Request, Response } from "express";
import { login } from '../controllers/authController';
import { register } from "../controllers/registerController";
import { validateLoginPayload } from "../validators/loginValidator";
import { validateRegisterPayload } from "../validators/registerValidator";

const router = Router();

router.post('/login', validateLoginPayload, login);
router.post('/register', validateRegisterPayload, register);

export default router;