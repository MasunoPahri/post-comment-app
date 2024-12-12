// src/models/User.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class User {
  private static prisma = prisma;

  // Define the User fields as a class
  id: number;
  username: string;
  email: string;
  password: string;

  constructor(id: number, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // Static method to create a new user
  static async createUser(username: string, email: string, password: string) {
    const user = await this.prisma.user.create({
      data: { username, email, password },
    });

    return user;
  }

  // Static method to find a user by username
  static async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return user;
  }

  // Static method to find a user by ID
  static async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
}