"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { username }
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const comaprePwd = await bcryptjs_1.default.compare(password, user.password);
    if (!user || !comaprePwd) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
};
exports.login = login;
