import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: "Missing fields" });
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already registered" });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, passwordHash: hash } });
    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "30d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "30d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const me = async (req: Request, res: Response) => {
  // authMiddleware ensures req.user
  const anyReq = req as any;
  const id = anyReq.user?.id;
  if (!id) return res.status(401).json({ error: "Not authorized" });
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt });
};