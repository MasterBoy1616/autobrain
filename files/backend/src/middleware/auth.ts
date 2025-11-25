import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export interface AuthedRequest extends Request {
  user?: { id: string; email: string; name?: string };
}

export const authMiddleware = (req: AuthedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header" });
  }
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid authorization header" });
  }
  try {
    const payload = jwt.verify(parts[1], JWT_SECRET) as any;
    req.user = { id: payload.userId, email: payload.email, name: payload.name };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};