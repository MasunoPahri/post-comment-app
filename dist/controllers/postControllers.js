"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllPost = async (req, res) => {
    try {
        // const posts = await prisma
        return res.status(200).json({ message: " " });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
exports.getAllPost = getAllPost;
