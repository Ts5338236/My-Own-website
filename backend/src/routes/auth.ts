import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { signToken, verifyToken, COOKIE_NAME } from "../lib/auth";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Sign JWT Token
    const token = await signToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    });

    // Set cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 86400000, // 24 hours in milliseconds
      secure: process.env.NODE_ENV === "production",
    });

    return res.json({
      success: true,
      user: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (err: any) {
    console.error("Login API error:", err);
    return res.status(500).json({ error: "Internal server error during authentication." });
  }
});

// POST /api/auth/logout
router.post("/logout", async (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ success: true });
});

// GET /api/auth/session
router.get("/session", async (req: Request, res: Response) => {
  try {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
      return res.json({ authenticated: false });
    }

    const decoded = await verifyToken(token);

    if (!decoded) {
      return res.json({ authenticated: false });
    }

    return res.json({
      authenticated: true,
      user: { email: decoded.email, name: decoded.name },
    });
  } catch (err) {
    console.error("Session check API error:", err);
    return res.json({ authenticated: false });
  }
});

export default router;
