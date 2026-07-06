import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { verifyToken, COOKIE_NAME } from "../lib/auth";

const router = Router();

// Authentication middleware for Express
async function requireAuth(req: Request, res: Response, next: any) {
  try {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid session session token." });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized access." });
  }
}

// Public Lead creation: POST /api/leads
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, company, projectType, budget, message } = req.body;

    if (!name || !email || !company || !projectType || !budget || !message) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        company,
        projectType,
        budget,
        message,
        status: "new",
      },
    });

    return res.status(201).json({ success: true, lead });
  } catch (err: any) {
    console.error("Lead creation API error:", err);
    return res.status(500).json({ error: "Database transaction failed." });
  }
});

// Protected Admin leads list: GET /api/leads
router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json({ leads });
  } catch (err) {
    console.error("Get leads API error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Protected Admin lead status update: PATCH /api/leads/:id
router.patch("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Missing status parameter." });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status },
    });

    return res.json({ success: true, lead: updatedLead });
  } catch (err: any) {
    console.error("PATCH lead API error:", err);
    return res.status(500).json({ error: "Database update failed." });
  }
});

// Protected Admin lead deletion: DELETE /api/leads/:id
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.lead.delete({
      where: { id },
    });

    return res.json({ success: true });
  } catch (err: any) {
    console.error("DELETE lead API error:", err);
    return res.status(500).json({ error: "Database deletion failed." });
  }
});

export default router;
