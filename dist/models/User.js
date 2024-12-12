"use strict";
// src/models/User.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    // Static method to create a new user
    static async createUser(username, email, password) {
        const user = await this.prisma.user.create({
            data: { username, email, password },
        });
        return user;
    }
    // Static method to find a user by username
    static async findByUsername(username) {
        const user = await this.prisma.user.findUnique({
            where: { username },
        });
        return user;
    }
    // Static method to find a user by ID
    static async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user;
    }
}
exports.User = User;
User.prisma = prisma;
